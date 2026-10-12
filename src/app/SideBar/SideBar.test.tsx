import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "app/SideBar/SideBar";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";

const signInAs = (roles: string[]) =>
  useCurrentUserStore.setState({ user: { id: "1", displayName: "Test User", email: "test@example.com", roles } });

const renderSideBar = () =>
  render(
    <MemoryRouter>
      <SideBar />
    </MemoryRouter>
  );

test("shows the user management link to a Supervisor", () => {
  signInAs(["Supervisor"]);

  renderSideBar();

  expect(screen.getByRole("link", { name: "Utilisateurs" })).toHaveAttribute("href", "/admin/users");
});

test("hides the user management link from an Agent", () => {
  signInAs(["Agent"]);

  renderSideBar();

  expect(screen.queryByRole("link", { name: "Utilisateurs" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Réclamations" })).toBeInTheDocument();
});
