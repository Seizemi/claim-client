import { TrashIcon } from "shared/components/icons";
import { FAILED_USER_HINT, ROLE_LABELS, User, USER_STATUS, USER_STATUS_LABELS } from "features/users/types/user";
import "features/users/components/UserTable/UserTable.scss";

interface UserTableProps {
  users: User[];
  canDelete: (user: User) => boolean;
  onDelete: (user: User) => void;
}

const UserTable = ({ users, canDelete, onDelete }: UserTableProps) => {
  if (users.length === 0) {
    return <p className="user-table__empty">Aucun utilisateur.</p>;
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>
              {user.role ? (
                <span className={`user-table__role user-table__role--${user.role.toLowerCase()}`}>
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
              ) : (
                "—"
              )}
            </td>
            <td>
              <span className={`user-table__status user-table__status--${user.status.toLowerCase()}`}>
                {USER_STATUS_LABELS[user.status]}
              </span>
              {user.status === USER_STATUS.FAILED && <p className="user-table__hint">{FAILED_USER_HINT}</p>}
            </td>
            <td className="user-table__actions">
              {canDelete(user) && (
                <button
                  type="button"
                  className="user-table__delete"
                  onClick={() => onDelete(user)}
                  aria-label={`Supprimer ${user.displayName}`}
                >
                  <TrashIcon />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
