import { ReactNode } from "react";
import { LOGOUT_ROUTE } from "shared/services/authRoutes";
import { runBeforeSignOutHandlers } from "shared/services/signOutHandlers";
import "features/auth/SignOutButton/SignOutButton.scss";

interface SignOutButtonProps {
  className?: string;
  children: ReactNode;
}

// A real form POST (browser navigation, never fetch): the backend clears the session cookie
// and redirects to Entra to end its session too, which a fetch call could not follow.
// Registered before-sign-out handlers run first, while the session cookie is still valid.
const SignOutButton = ({ className, children }: SignOutButtonProps) => (
  <form method="post" action={LOGOUT_ROUTE} className="sign-out-form" onSubmit={runBeforeSignOutHandlers}>
    <button type="submit" className={className}>
      {children}
    </button>
  </form>
);

export default SignOutButton;
