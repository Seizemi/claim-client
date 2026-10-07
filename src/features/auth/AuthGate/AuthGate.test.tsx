import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthGate from "features/auth/AuthGate/AuthGate";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";
import { assignLocation } from "shared/services/browserNavigation";
import { stubHttp } from "shared/testing/stubHttp";

jest.mock("shared/services/browserNavigation", () => ({ assignLocation: jest.fn() }));
jest.mock("react-toastify", () => ({ toast: { error: jest.fn() } }));

const supervisor = { id: "1", displayName: "Ada Lovelace", email: "ada@example.com", roles: ["Supervisor"] };

beforeEach(() => {
  useCurrentUserStore.setState({ user: null });
  (assignLocation as jest.Mock).mockReset();
});

test("shows a loader, then the app once /api/me returns the user", async () => {
  const requests = stubHttp(() => ({ status: 200, data: supervisor }));

  render(<AuthGate>App content</AuthGate>);

  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("App content")).toBeInTheDocument();
  expect(requests.map((request) => request.url)).toContain("/api/me");
  expect(useCurrentUserStore.getState().user).toEqual(supervisor);
});

test("without a session, redirects to sign-in and never renders the app", async () => {
  stubHttp(() => ({ status: 401 }));

  render(<AuthGate>App content</AuthGate>);

  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(assignLocation).toHaveBeenCalledWith("/auth/login?returnUrl=%2F");
  expect(screen.queryByText("App content")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("on a server error, offers a retry that loads the app", async () => {
  let status = 500;
  stubHttp(() => ({ status, data: supervisor }));

  render(<AuthGate>App content</AuthGate>);

  const retry = await screen.findByRole("button", { name: "Réessayer" });
  status = 200;
  userEvent.click(retry);

  expect(await screen.findByText("App content")).toBeInTheDocument();
});
