import { useCallback, useMemo } from "react";
import { Role } from "features/auth/types/currentUser";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";

// Role checks here only show or hide UI; the backend is the only place where access is enforced.
export const useCurrentUser = () => {
  const user = useCurrentUserStore((state) => state.user);
  const roles = useMemo(() => user?.roles ?? [], [user]);
  const hasRole = useCallback((role: Role) => roles.includes(role), [roles]);

  return { user, roles, hasRole };
};
