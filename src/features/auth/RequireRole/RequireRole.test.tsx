import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RequireRole from "features/auth/RequireRole/RequireRole";
import { ROLES } from "features/auth/types/currentUser";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";

const signInAs = (roles: string[]) =>
  useCurrentUserStore.setState({ user: { id: "1", displayName: "Test User", email: "test@example.com", roles } });

const renderGuarded = () =>
  render(
    <MemoryRouter>
      <RequireRole role={ROLES.SUPERVISOR}>Admin page</RequireRole>
    </MemoryRouter>
  );

test("renders the children when the user has the role", () => {
  signInAs([ROLES.SUPERVISOR]);

  renderGuarded();

  expect(screen.getByText("Admin page")).toBeInTheDocument();
});

test("renders NotAuthorized when the user lacks the role", () => {
  signInAs([ROLES.AGENT]);

  renderGuarded();

  expect(screen.queryByText("Admin page")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Accès refusé" })).toBeInTheDocument();
});
