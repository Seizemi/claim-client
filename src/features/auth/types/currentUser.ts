import { z } from "zod";

// App role values defined in Entra External ID. Renaming a role means changing Entra, the
// backend's AppRoles, the PartnerUsers:Roles keys and these constants together.
export const ROLES = {
  SUPERVISOR: "Supervisor",
  AGENT: "Agent",
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];

// Mirrors ClaimApi's CurrentUserResponse (GET /api/me), built from the session's claims.
export const CurrentUserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
});
export type CurrentUser = z.infer<typeof CurrentUserSchema>;
