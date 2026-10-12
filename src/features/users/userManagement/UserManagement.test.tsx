import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";
import UserManagement from "features/users/userManagement/UserManagement";
import { stubHttp, StubResponse } from "shared/testing/stubHttp";

jest.mock("shared/services/browserNavigation", () => ({ assignLocation: jest.fn() }));
jest.mock("react-toastify", () => ({ toast: { error: jest.fn(), success: jest.fn() } }));

const SELF_ID = "11111111-1111-1111-1111-111111111111";
const supervisor = { id: SELF_ID, displayName: "Ada Lovelace", email: "ada@example.com", role: "Supervisor", status: "Active" };
const otherSupervisor = { id: "22222222-2222-2222-2222-222222222222", displayName: "Grace Hopper", email: "grace@example.com", role: "Supervisor", status: "Active" };
const agent = { id: "33333333-3333-3333-3333-333333333333", displayName: "Alan Turing", email: "alan@example.com", role: "Agent", status: "Active" };

const problem = (status: number, errors: Record<string, string[]>): StubResponse => ({
  status,
  data: { title: "One or more validation errors occurred.", status, errors },
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <UserManagement />
    </MemoryRouter>
  );

const rowOf = (name: string) => screen.getByRole("cell", { name }).closest("tr") as HTMLElement;

beforeEach(() => {
  useCurrentUserStore.setState({
    user: { id: SELF_ID, displayName: "Ada Lovelace", email: "ada@example.com", roles: ["Supervisor"] },
  });
  jest.clearAllMocks();
});

test("lists users; only Agents other than oneself have a delete action", async () => {
  stubHttp(() => ({ status: 200, data: [supervisor, otherSupervisor, agent] }));

  renderPage();

  expect(await screen.findByRole("cell", { name: "Alan Turing" })).toBeInTheDocument();
  expect(within(rowOf("Alan Turing")).getByRole("button", { name: "Supprimer Alan Turing" })).toBeInTheDocument();
  expect(within(rowOf("Ada Lovelace")).queryByRole("button")).not.toBeInTheDocument();
  expect(within(rowOf("Grace Hopper")).queryByRole("button")).not.toBeInTheDocument();
});

test("creates an Agent with the CSRF header and adds it to the list", async () => {
  const created = { id: "44444444-4444-4444-4444-444444444444", displayName: "Katherine Johnson", email: "kj@example.com", role: "Agent", status: "Pending" };
  const requests = stubHttp((config) =>
    config.method === "post" ? { status: 201, data: created } : { status: 200, data: [supervisor] }
  );

  renderPage();
  await screen.findByRole("cell", { name: "Ada Lovelace" });

  userEvent.click(screen.getByRole("button", { name: /nouvel agent/i }));
  const dialog = screen.getByRole("dialog", { name: "Nouvel agent" });
  userEvent.type(within(dialog).getByLabelText("Nom"), "  Katherine Johnson ");
  userEvent.type(within(dialog).getByLabelText("Email"), "kj@example.com");
  userEvent.click(within(dialog).getByRole("button", { name: "Créer" }));

  expect(await screen.findByRole("cell", { name: "Katherine Johnson" })).toBeInTheDocument();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  const post = requests.find((request) => request.method === "post")!;
  expect(post.url).toBe("/api/users");
  expect(JSON.parse(post.data)).toEqual({ email: "kj@example.com", displayName: "Katherine Johnson", role: "Agent" });
  expect(post.headers.get("X-CSRF")).toBe("1");
  expect(within(rowOf("Katherine Johnson")).getByText("En attente")).toBeInTheDocument();
});

test("shows each user's status, with what to do for a failed one", async () => {
  const pending = { ...agent, id: "55555555-5555-5555-5555-555555555555", displayName: "Hedy Lamarr", status: "Pending" };
  const failed = { ...agent, id: "66666666-6666-6666-6666-666666666666", displayName: "Joan Clarke", status: "Failed" };
  stubHttp(() => ({ status: 200, data: [agent, pending, failed] }));

  renderPage();

  expect(await screen.findByRole("cell", { name: "Alan Turing" })).toBeInTheDocument();
  expect(within(rowOf("Alan Turing")).getByText("Actif")).toBeInTheDocument();
  expect(within(rowOf("Hedy Lamarr")).getByText("En attente")).toBeInTheDocument();
  expect(within(rowOf("Joan Clarke")).getByText("Échec")).toBeInTheDocument();
  expect(within(rowOf("Joan Clarke")).getByText(/supprimez l'utilisateur puis recréez-le/)).toBeInTheDocument();
  // A failed user can be deleted, to be created again.
  expect(within(rowOf("Joan Clarke")).getByRole("button", { name: "Supprimer Joan Clarke" })).toBeInTheDocument();
});

test("Refresh reloads the list, e.g. to see a pending user become active", async () => {
  let status = "Pending";
  const requests = stubHttp(() => ({ status: 200, data: [{ ...agent, status }] }));

  renderPage();
  expect(await screen.findByText("En attente")).toBeInTheDocument();

  status = "Active";
  userEvent.click(screen.getByRole("button", { name: /actualiser/i }));

  expect(await screen.findByText("Actif")).toBeInTheDocument();
  expect(requests.filter((request) => request.method === "get")).toHaveLength(2);
});

test("the list is not refreshed automatically", async () => {
  jest.useFakeTimers();
  try {
    const requests = stubHttp(() => ({ status: 200, data: [{ ...agent, status: "Pending" }] }));

    renderPage();
    expect(await screen.findByText("En attente")).toBeInTheDocument();
    jest.advanceTimersByTime(60_000);

    expect(requests.filter((request) => request.method === "get")).toHaveLength(1);
  } finally {
    jest.useRealTimers();
  }
});

test("shows a clear message in the form when the email already exists (409)", async () => {
  stubHttp((config) =>
    config.method === "post"
      ? problem(409, { "User.AlreadyExists": ["A user with this email already exists."] })
      : { status: 200, data: [supervisor] }
  );

  renderPage();
  await screen.findByRole("cell", { name: "Ada Lovelace" });

  userEvent.click(screen.getByRole("button", { name: /nouvel agent/i }));
  userEvent.type(screen.getByLabelText("Nom"), "Ada Bis");
  userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
  userEvent.click(screen.getByRole("button", { name: "Créer" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Un utilisateur avec cet email existe déjà.");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(toast.error).not.toHaveBeenCalled();
});

test("validates the form before sending anything", async () => {
  const requests = stubHttp(() => ({ status: 200, data: [supervisor] }));

  renderPage();
  await screen.findByRole("cell", { name: "Ada Lovelace" });

  userEvent.click(screen.getByRole("button", { name: /nouvel agent/i }));
  userEvent.type(screen.getByLabelText("Nom"), "Someone");
  userEvent.type(screen.getByLabelText("Email"), "not-an-email");
  userEvent.click(screen.getByRole("button", { name: "Créer" }));

  expect(screen.getByRole("alert")).toHaveTextContent("L'adresse email n'est pas valide.");
  expect(requests.filter((request) => request.method === "post")).toHaveLength(0);
});

test("deletes an Agent after confirmation", async () => {
  const requests = stubHttp((config) =>
    config.method === "delete" ? { status: 204 } : { status: 200, data: [supervisor, agent] }
  );

  renderPage();
  userEvent.click(await screen.findByRole("button", { name: "Supprimer Alan Turing" }));
  const dialog = screen.getByRole("dialog", { name: "Supprimer l'agent" });
  userEvent.click(within(dialog).getByRole("button", { name: "Supprimer" }));

  await waitFor(() => expect(screen.queryByRole("cell", { name: "Alan Turing" })).not.toBeInTheDocument());
  const del = requests.find((request) => request.method === "delete")!;
  expect(del.url).toBe(`/api/users/${agent.id}`);
  expect(del.headers.get("X-CSRF")).toBe("1");
});

test("cancelling the confirmation deletes nothing", async () => {
  const requests = stubHttp(() => ({ status: 200, data: [supervisor, agent] }));

  renderPage();
  userEvent.click(await screen.findByRole("button", { name: "Supprimer Alan Turing" }));
  userEvent.click(screen.getByRole("button", { name: "Annuler" }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "Alan Turing" })).toBeInTheDocument();
  expect(requests.filter((request) => request.method === "delete")).toHaveLength(0);
});

test("a rejected delete (400) keeps the row and shows the reason", async () => {
  stubHttp((config) =>
    config.method === "delete"
      ? problem(400, { "User.CannotDeleteSupervisor": ["A Supervisor cannot be deleted from the application."] })
      : { status: 200, data: [supervisor, agent] }
  );

  renderPage();
  userEvent.click(await screen.findByRole("button", { name: "Supprimer Alan Turing" }));
  userEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Supprimer" }));

  await waitFor(() =>
    expect(toast.error).toHaveBeenCalledWith("Un superviseur ne peut pas être supprimé depuis l'application.")
  );
  expect(screen.getByRole("cell", { name: "Alan Turing" })).toBeInTheDocument();
});

test("a user already gone (404) is removed from the list", async () => {
  stubHttp((config) =>
    config.method === "delete"
      ? problem(404, { "User.NotFound": ["User doesn't exist."] })
      : { status: 200, data: [supervisor, agent] }
  );

  renderPage();
  userEvent.click(await screen.findByRole("button", { name: "Supprimer Alan Turing" }));
  userEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Supprimer" }));

  await waitFor(() => expect(screen.queryByRole("cell", { name: "Alan Turing" })).not.toBeInTheDocument());
  expect(toast.error).toHaveBeenCalledWith("Cet utilisateur n'existe plus.");
});

test("a 403 from the backend shows the NotAuthorized page", async () => {
  stubHttp(() => ({ status: 403 }));

  renderPage();

  expect(await screen.findByRole("heading", { name: "Accès refusé" })).toBeInTheDocument();
  expect(toast.error).not.toHaveBeenCalled();
});
