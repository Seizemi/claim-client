import { isApiError } from "shared/services/apiError";

// The backend's ProblemDetails messages are in English and keyed by error code (handler errors) or
// by property name (validation errors); the UI shows its own French message for each of them.
const MESSAGES_BY_KEY: Record<string, string> = {
  "User.AlreadyExists": "Un utilisateur avec cet email existe déjà.",
  "User.NotFound": "Cet utilisateur n'existe plus.",
  "User.CannotDeleteSelf": "Vous ne pouvez pas supprimer votre propre compte.",
  "User.CannotDeleteSupervisor": "Un superviseur ne peut pas être supprimé depuis l'application.",
  "User.RoleIsNotAssignable": "Ce rôle ne peut pas être attribué depuis l'application.",
  "User.DirectoryUnavailable": "L'annuaire des utilisateurs est indisponible. Veuillez réessayer plus tard.",
  Email: "L'adresse email n'est pas valide.",
  DisplayName: "Le nom doit contenir entre 1 et 100 caractères.",
  Role: "Ce rôle ne peut pas être attribué depuis l'application.",
};

const MESSAGES_BY_STATUS: Record<number, string> = {
  400: "Les informations saisies ne sont pas valides.",
  404: MESSAGES_BY_KEY["User.NotFound"],
  409: MESSAGES_BY_KEY["User.AlreadyExists"],
  502: MESSAGES_BY_KEY["User.DirectoryUnavailable"],
};

// Returns null for errors that aren't user-management errors (network failure, 500, 403...), which
// are left to useApi's default handling.
export const getUserErrorMessage = (error: unknown): string | null => {
  if (!isApiError(error)) {
    return null;
  }

  const keys = Object.keys(error.problem?.errors ?? {});
  const knownKey = keys.find((key) => key in MESSAGES_BY_KEY);
  if (knownKey) {
    return MESSAGES_BY_KEY[knownKey];
  }

  return MESSAGES_BY_STATUS[error.status] ?? null;
};
