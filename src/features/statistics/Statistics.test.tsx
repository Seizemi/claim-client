import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { getCurrentSeasonValue, getPreviousSeasonValue, SEASON_OPTIONS } from "features/claims/utils/seasonOptions";
import Statistics from "features/statistics/Statistics";
import { httpClient } from "shared/services/httpClient";

jest.mock("shared/services/browserNavigation", () => ({ assignLocation: jest.fn() }));
jest.mock("react-toastify", () => ({ toast: { error: jest.fn(), success: jest.fn() } }));
// Chart.js draws on a canvas, which jsdom doesn't have.
jest.mock("features/statistics/charts/chartSetup", () => ({}));
jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="chart" />,
  Doughnut: () => <div data-testid="chart" />,
  Bar: () => <div data-testid="chart" />,
}));

const CURRENT_SEASON = getCurrentSeasonValue();
const PREVIOUS_SEASON = getPreviousSeasonValue(CURRENT_SEASON);
const OTHER_SEASON = SEASON_OPTIONS.map((option) => option.value).find(
  (value) => value !== CURRENT_SEASON && value !== PREVIOUS_SEASON
) as string;

const CHARTS_PER_SEASON_ON_RECLAMATION_TAB = 3;
const CHARTS_ON_RECLAMATION_TAB = CHARTS_PER_SEASON_ON_RECLAMATION_TAB * 2;

// Each request stays pending until the test answers it, to observe the page in between.
const stubPendingSeasons = () => {
  const pending: Array<{ config: InternalAxiosRequestConfig; respond: (status: number) => void }> = [];

  httpClient.defaults.adapter = (config) =>
    new Promise((resolve, reject) => {
      pending.push({
        config,
        respond: (status) => {
          const response: AxiosResponse = { data: [], status, statusText: "", headers: {}, config };
          if (status >= 400) {
            reject(new AxiosError(`Request failed with status code ${status}`, "ERR_BAD_RESPONSE", config, null, response));
          } else {
            resolve(response);
          }
        },
      });
    });

  // The request reaches the adapter shortly after the render, through axios' promise chain.
  return async (seasonValue: string, status = 200) => {
    const index = await waitFor(() => {
      const found = pending.findIndex((request) => request.config.url?.endsWith(`/${seasonValue}`));
      expect(found).toBeGreaterThanOrEqual(0);
      return found;
    });
    const [request] = pending.splice(index, 1);
    request.respond(status);
  };
};

const loaders = () => screen.queryAllByRole("status", { name: "Chargement du graphique" });

beforeEach(() => {
  jest.clearAllMocks();
});

test("shows a loader instead of every chart until both seasons are loaded", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);

  expect(loaders()).toHaveLength(CHARTS_ON_RECLAMATION_TAB);
  expect(screen.queryByTestId("chart")).not.toBeInTheDocument();

  await answer(CURRENT_SEASON);
  await answer(PREVIOUS_SEASON);

  expect(await screen.findAllByTestId("chart")).toHaveLength(CHARTS_ON_RECLAMATION_TAB);
  expect(loaders()).toHaveLength(0);
});

test("draws the charts of a loaded season while the other season is still loading", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);
  await answer(CURRENT_SEASON);

  expect(await screen.findAllByTestId("chart")).toHaveLength(CHARTS_PER_SEASON_ON_RECLAMATION_TAB);
  expect(loaders()).toHaveLength(CHARTS_PER_SEASON_ON_RECLAMATION_TAB);
});

test("shows the loaders again when a season changes", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);
  await answer(CURRENT_SEASON);
  await answer(PREVIOUS_SEASON);
  await screen.findAllByTestId("chart");

  userEvent.selectOptions(screen.getAllByRole("combobox")[0], OTHER_SEASON);

  expect(loaders()).toHaveLength(CHARTS_PER_SEASON_ON_RECLAMATION_TAB);
  await answer(OTHER_SEASON);
  await waitFor(() => expect(loaders()).toHaveLength(0));
});

test("keeps the loaders until the last selected season answers, ignoring the abandoned one", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);
  await answer(PREVIOUS_SEASON);
  await screen.findAllByTestId("chart");

  userEvent.selectOptions(screen.getAllByRole("combobox")[0], OTHER_SEASON);
  await answer(CURRENT_SEASON);

  // Lets the abandoned response go through the page.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(loaders()).toHaveLength(CHARTS_PER_SEASON_ON_RECLAMATION_TAB);

  await answer(OTHER_SEASON);
  await waitFor(() => expect(loaders()).toHaveLength(0));
});

test("stops the loaders and tells the user when a season fails to load", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);
  await answer(CURRENT_SEASON, 500);
  await answer(PREVIOUS_SEASON);

  await waitFor(() => expect(loaders()).toHaveLength(0));
  expect(toast.error).toHaveBeenCalledTimes(1);
});

test("hides the legends of a chart while it is loading", async () => {
  const answer = stubPendingSeasons();

  render(<Statistics />);

  const titleOf = (name: string) => screen.getByRole("heading", { name }).parentElement as HTMLElement;
  const firstSeasonStatus = "Statut des réclamations sur la première saison";
  expect(within(titleOf(firstSeasonStatus)).queryByRole("list")).not.toBeInTheDocument();

  await answer(CURRENT_SEASON);

  expect(await within(titleOf(firstSeasonStatus)).findByRole("list")).toBeInTheDocument();
});
