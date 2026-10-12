import { ApiError } from "shared/services/apiError";
import { getUserErrorMessage } from "features/users/utils/userErrorMessages";

test("maps a backend error code to its French message", () => {
  const error = new ApiError(400, { errors: { "User.CannotDeleteSelf": ["You cannot delete your own account."] } });

  expect(getUserErrorMessage(error)).toBe("Vous ne pouvez pas supprimer votre propre compte.");
});

test("maps a validation error by property name", () => {
  const error = new ApiError(400, { errors: { Email: ["Email is not a valid email address."] } });

  expect(getUserErrorMessage(error)).toBe("L'adresse email n'est pas valide.");
});

test("falls back to the status when the body is not ProblemDetails", () => {
  expect(getUserErrorMessage(new ApiError(409, null))).toBe("Un utilisateur avec cet email existe déjà.");
  expect(getUserErrorMessage(new ApiError(502, null))).toContain("indisponible");
});

test("leaves other errors to the default handling", () => {
  expect(getUserErrorMessage(new ApiError(500, null))).toBeNull();
  expect(getUserErrorMessage(new ApiError(403, null))).toBeNull();
  expect(getUserErrorMessage(new Error("network"))).toBeNull();
});
