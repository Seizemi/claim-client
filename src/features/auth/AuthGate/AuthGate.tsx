import { ReactNode } from "react";
import { useAuthGate } from "features/auth/AuthGate/useAuthGate";
import "features/auth/AuthGate/AuthGate.scss";

interface AuthGateProps {
  children: ReactNode;
}

// Renders the app only once the signed-in user is known (GET /api/me).
const AuthGate = ({ children }: AuthGateProps) => {
  const { user, error, retry } = useAuthGate();

  if (user) {
    return <>{children}</>;
  }

  if (error) {
    return (
      <div className="auth-gate">
        <p className="auth-gate__message">Impossible de vérifier votre session.</p>
        <button type="button" className="auth-gate__retry" onClick={retry}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="auth-gate" role="status" aria-live="polite">
      <span className="auth-gate__spinner" aria-hidden="true" />
      <p className="auth-gate__message">Chargement…</p>
    </div>
  );
};

export default AuthGate;
