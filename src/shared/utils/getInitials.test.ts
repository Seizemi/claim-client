import { getInitials } from "shared/utils/getInitials";

test.each([
  ["Maxime Delobelle", "MD"],
  ["ada", "A"],
  ["  jean   paul  sartre ", "JP"],
  ["", ""],
])("getInitials(%p) is %p", (name, expected) => {
  expect(getInitials(name)).toBe(expected);
});
