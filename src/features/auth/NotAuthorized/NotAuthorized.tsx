import { Link } from "react-router-dom";
import "features/auth/NotAuthorized/NotAuthorized.scss";

const NotAuthorized = () => (
  <div className="not-authorized">
    <h1 className="not-authorized__title">Accès refusé</h1>
    <p className="not-authorized__text">Vous n'avez pas les droits nécessaires pour afficher cette page.</p>
    <Link to="/" className="not-authorized__link">
      Retour aux réclamations
    </Link>
  </div>
);

export default NotAuthorized;
