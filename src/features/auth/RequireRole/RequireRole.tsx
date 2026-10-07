import { ReactNode } from "react";
import NotAuthorized from "features/auth/NotAuthorized/NotAuthorized";
import { Role } from "features/auth/types/currentUser";
import { useCurrentUser } from "features/auth/useCurrentUser";

interface RequireRoleProps {
  role: Role;
  children: ReactNode;
}

// Route guard for the UI only: the backend still answers 403 to a user without the role.
const RequireRole = ({ role, children }: RequireRoleProps) => {
  const { hasRole } = useCurrentUser();

  return hasRole(role) ? <>{children}</> : <NotAuthorized />;
};

export default RequireRole;
