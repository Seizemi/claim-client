import { DISPLAY_NAME_MAX_LENGTH } from "features/users/types/user";

// "local@domain.tld" without spaces: the backend does the authoritative check.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface CreateUserFormState {
  email: string;
  displayName: string;
}

export const EMPTY_CREATE_USER_FORM: CreateUserFormState = { email: "", displayName: "" };

export const validateCreateUserForm = ({ email, displayName }: CreateUserFormState): string | null => {
  const trimmedName = displayName.trim();
  if (!trimmedName || trimmedName.length > DISPLAY_NAME_MAX_LENGTH) {
    return `Le nom doit contenir entre 1 et ${DISPLAY_NAME_MAX_LENGTH} caractères.`;
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "L'adresse email n'est pas valide.";
  }
  return null;
};
