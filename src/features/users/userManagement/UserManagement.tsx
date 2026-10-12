import { RefreshIcon, UserPlusIcon } from "shared/components/icons";
import NotAuthorized from "features/auth/NotAuthorized/NotAuthorized";
import CreateUserDialog from "features/users/components/CreateUserDialog/CreateUserDialog";
import DeleteUserDialog from "features/users/components/DeleteUserDialog/DeleteUserDialog";
import UserTable from "features/users/components/UserTable/UserTable";
import { useUserManagement } from "features/users/userManagement/useUserManagement";
import "features/users/userManagement/UserManagement.scss";

// Supervisor admin page: lists the application's users, creates Agents and deletes them.
const UserManagement = () => {
  const {
    users,
    isLoading,
    hasError,
    isForbidden,
    retry,
    canDelete,
    isCreateOpen,
    openCreate,
    closeCreate,
    onUserCreated,
    userToDelete,
    isDeleting,
    askDelete,
    cancelDelete,
    confirmDelete,
  } = useUserManagement();

  if (isForbidden) {
    return <NotAuthorized />;
  }

  return (
    <div className="user-management">
      <div className="user-management__header">
        <h2 className="user-management__title">Utilisateurs</h2>
        <div className="user-management__buttons">
          {/* No automatic refresh: the Supervisor reloads the list to see a new user's role assigned. */}
          <button type="button" className="user-management__refresh" onClick={retry} disabled={isLoading}>
            <RefreshIcon />
            Actualiser
          </button>
          <button type="button" className="user-management__create" onClick={openCreate}>
            <UserPlusIcon />
            Nouvel agent
          </button>
        </div>
      </div>

      <div className="user-management__card">
        {users ? (
          <UserTable users={users} canDelete={canDelete} onDelete={askDelete} />
        ) : hasError && !isLoading ? (
          <div className="user-management__status">
            <p>Impossible de charger les utilisateurs.</p>
            <button type="button" className="user-management__retry" onClick={retry}>
              Réessayer
            </button>
          </div>
        ) : (
          <p className="user-management__status" role="status">
            Chargement…
          </p>
        )}
      </div>

      {isCreateOpen && <CreateUserDialog onCreated={onUserCreated} onClose={closeCreate} />}
      {userToDelete && (
        <DeleteUserDialog user={userToDelete} isDeleting={isDeleting} onConfirm={confirmDelete} onClose={cancelDelete} />
      )}
    </div>
  );
};

export default UserManagement;
