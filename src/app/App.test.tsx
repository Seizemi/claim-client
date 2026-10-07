import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "app/App";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";
import { stubHttp } from "shared/testing/stubHttp";

jest.mock("shared/services/browserNavigation", () => ({ assignLocation: jest.fn() }));

beforeEach(() => {
  useCurrentUserStore.setState({ user: null });
});

test("shows the signed-in user and a sign-out form posting to /auth/logout", async () => {
  stubHttp((config) =>
    config.url === "/api/me"
      ? { status: 200, data: { id: "1", displayName: "Ada Lovelace", email: "ada@example.com", roles: ["Agent"] } }
      : { status: 503 }
  );

  render(<App />);

  const avatar = await screen.findByRole("button", { name: "Ada Lovelace" });
  expect(avatar).toHaveTextContent("AL");

  userEvent.click(avatar);
  const signOut = await screen.findByRole("button", { name: /deconnexion/i });
  const form = signOut.closest("form");
  expect(form).toHaveAttribute("method", "post");
  expect(form).toHaveAttribute("action", "/auth/logout");
});
