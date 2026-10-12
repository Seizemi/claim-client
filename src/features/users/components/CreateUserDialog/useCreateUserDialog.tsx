import { FormEvent, useState } from "react";
import { useApi } from "shared/hooks/useApi";
import {
  ASSIGNABLE_ROLE,
  CreateUserRequest,
  User,
  UserSchema,
  USERS_ROUTE,
} from "features/users/types/user";
import { getUserErrorMessage } from "features/users/utils/userErrorMessages";
import {
  CreateUserFormState,
  EMPTY_CREATE_USER_FORM,
  validateCreateUserForm,
} from "features/users/utils/validateCreateUserForm";

export const useCreateUserDialog = (onCreated: (user: User) => void) => {
  const [form, setForm] = useState<CreateUserFormState>(EMPTY_CREATE_USER_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  // Known errors (409 existing email, 400 invalid input, 502 directory down) are shown in the form;
  // anything else falls back to useApi's toast.
  const { isLoading, request } = useApi(UserSchema, {
    onError: (err) => {
      const message = getUserErrorMessage(err);
      setFormError(message);
      return message !== null;
    },
  });

  const onChange = (field: keyof CreateUserFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    // The button is disabled while the request runs, but Enter in a field still submits the form:
    // a second request would try to create the same user again.
    if (isLoading) {
      return;
    }

    const validationError = validateCreateUserForm(form);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    // No password is set here: the user chooses one through "Forgot password" on first sign-in.
    const body: CreateUserRequest = {
      email: form.email.trim(),
      displayName: form.displayName.trim(),
      role: ASSIGNABLE_ROLE,
    };
    const created = await request({ method: "POST", url: USERS_ROUTE, data: body });
    if (created) {
      onCreated(created);
    }
  };

  return { form, formError, isLoading, onChange, submit };
};
