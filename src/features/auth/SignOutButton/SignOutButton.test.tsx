import { fireEvent, render, screen } from "@testing-library/react";
import SignOutButton from "features/auth/SignOutButton/SignOutButton";
import { onBeforeSignOut } from "shared/services/signOutHandlers";

test("posts a form to /auth/logout", () => {
  render(<SignOutButton>Sign out</SignOutButton>);

  const form = screen.getByRole("button", { name: "Sign out" }).closest("form");
  expect(form).toHaveAttribute("method", "post");
  expect(form).toHaveAttribute("action", "/auth/logout");
});

test("runs the before-sign-out handlers when the form is submitted", () => {
  const releaseLock = jest.fn();
  const remove = onBeforeSignOut(releaseLock);
  render(<SignOutButton>Sign out</SignOutButton>);

  fireEvent.submit(screen.getByRole("button", { name: "Sign out" }).closest("form")!);

  expect(releaseLock).toHaveBeenCalledTimes(1);
  remove();
});
