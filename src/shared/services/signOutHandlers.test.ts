import { onBeforeSignOut, runBeforeSignOutHandlers } from "shared/services/signOutHandlers";

test("runs every registered handler", () => {
  const first = jest.fn();
  const second = jest.fn();
  const removeFirst = onBeforeSignOut(first);
  const removeSecond = onBeforeSignOut(second);

  runBeforeSignOutHandlers();

  expect(first).toHaveBeenCalledTimes(1);
  expect(second).toHaveBeenCalledTimes(1);
  removeFirst();
  removeSecond();
});

test("does not run a handler once it is removed", () => {
  const handler = jest.fn();
  const remove = onBeforeSignOut(handler);

  remove();
  runBeforeSignOutHandlers();

  expect(handler).not.toHaveBeenCalled();
});

test("a failing handler does not stop the others", () => {
  const failing = jest.fn(() => {
    throw new Error("boom");
  });
  const next = jest.fn();
  const removeFailing = onBeforeSignOut(failing);
  const removeNext = onBeforeSignOut(next);

  expect(() => runBeforeSignOutHandlers()).not.toThrow();
  expect(next).toHaveBeenCalledTimes(1);
  removeFailing();
  removeNext();
});
