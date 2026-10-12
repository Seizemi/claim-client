import { z } from "zod";
import { ROLES } from "features/auth/types/currentUser";

export const USERS_ROUTE = "/api/users";
export const userByIdRoute = (id: string) => `${USERS_ROUTE}/${encodeURIComponent(id)}`;

// The only role a Supervisor can give from the app (backend PartnerUsers:AssignableRoles), so the
// create form has no role picker. Supervisors are created in the Entra admin center only.
export const ASSIGNABLE_ROLE = ROLES.AGENT;

// Must match the backend's CreateUserRequestValidator.
export const DISPLAY_NAME_MAX_LENGTH = 100;

// A new user's role is assigned in the background by the backend (spec 5.8): Pending until then,
// Failed if every attempt failed (the user can then only be deleted).
export const USER_STATUS = {
  ACTIVE: "Active",
  PENDING: "Pending",
  FAILED: "Failed",
} as const;

export const USER_STATUS_LABELS: Record<string, string> = {
  [USER_STATUS.ACTIVE]: "Actif",
  [USER_STATUS.PENDING]: "En attente",
  [USER_STATUS.FAILED]: "Échec",
};

export const FAILED_USER_HINT = "Le rôle n'a pas pu être attribué : supprimez l'utilisateur puis recréez-le.";

// Mirrors ClaimApi's UserResponse. `role` is null when the user's assignment has a role unknown to
// the backend's configuration; while the user is Pending or Failed, it is the role being assigned.
export const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string(),
  role: z.string().nullable(),
  status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.PENDING, USER_STATUS.FAILED]),
});
export type User = z.infer<typeof UserSchema>;

export const UserListSchema = z.array(UserSchema);

export interface CreateUserRequest {
  email: string;
  displayName: string;
  role: typeof ASSIGNABLE_ROLE;
}

export const ROLE_LABELS: Record<string, string> = {
  [ROLES.SUPERVISOR]: "Superviseur",
  [ROLES.AGENT]: "Agent",
};
