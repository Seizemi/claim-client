import Dialog from "shared/components/Dialog/Dialog";
import { User } from "features/users/types/user";
import "features/users/components/DeleteUserDialog/DeleteUserDialog.scss";

interface DeleteUserDialogProps {
  user: User;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteUserDialog = ({ user, isDeleting, onConfirm, onClose }: DeleteUserDialogProps) => (
  <Dialog title="Supprimer l'agent" onClose={onClose}>
    <p className="delete-user__text">
      Supprimer <strong>{user.displayName}</strong> ({user.email}) ? Son compte sera définitivement supprimé. S'il
      est connecté, sa session reste active jusqu'à son expiration.
    </p>
    <div className="delete-user__actions">
      <button type="button" className="delete-user__cancel" onClick={onClose}>
        Annuler
      </button>
      <button type="button" className="delete-user__confirm" onClick={onConfirm} disabled={isDeleting}>
        Supprimer
      </button>
    </div>
  </Dialog>
);

export default DeleteUserDialog;
