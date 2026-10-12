import Dialog from "shared/components/Dialog/Dialog";
import { DISPLAY_NAME_MAX_LENGTH, User } from "features/users/types/user";
import { useCreateUserDialog } from "features/users/components/CreateUserDialog/useCreateUserDialog";
import "features/users/components/CreateUserDialog/CreateUserDialog.scss";

interface CreateUserDialogProps {
  onCreated: (user: User) => void;
  onClose: () => void;
}

const CreateUserDialog = ({ onCreated, onClose }: CreateUserDialogProps) => {
  const { form, formError, isLoading, onChange, submit } = useCreateUserDialog(onCreated);

  return (
    <Dialog title="Nouvel agent" onClose={onClose}>
      <form className="create-user" onSubmit={submit} noValidate>
        <label className="create-user__field">
          <span className="create-user__label">Nom</span>
          <input
            className="create-user__input"
            type="text"
            value={form.displayName}
            maxLength={DISPLAY_NAME_MAX_LENGTH}
            onChange={(event) => onChange("displayName", event.target.value)}
            autoFocus
          />
        </label>

        <label className="create-user__field">
          <span className="create-user__label">Email</span>
          <input
            className="create-user__input"
            type="email"
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
          />
        </label>

        <p className="create-user__hint">
          Le rôle de l'agent est attribué en quelques instants. Il recevra alors un email de bienvenue et choisira son
          mot de passe via « Mot de passe oublié » lors de sa première connexion.
        </p>

        {formError && (
          <p className="create-user__error" role="alert">
            {formError}
          </p>
        )}

        <div className="create-user__actions">
          <button type="button" className="create-user__cancel" onClick={onClose}>
            Annuler
          </button>
          <button type="submit" className="create-user__submit" disabled={isLoading}>
            Créer
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateUserDialog;
