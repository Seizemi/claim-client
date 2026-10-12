import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { isApiError } from "shared/services/apiError";
import { ROLES } from "features/auth/types/currentUser";
import { useCurrentUser } from "features/auth/useCurrentUser";
import { User, UserListSchema, USERS_ROUTE, userByIdRoute } from "features/users/types/user";
import { getUserErrorMessage } from "features/users/utils/userErrorMessages";

// DELETE answers 204 with no body; normalize it so useApi's schema.parse succeeds.
const EmptyResponseSchema = z.union([z.undefined(), z.null(), z.literal("")]).transform(() => undefined);

const byDisplayName = (a: User, b: User) => a.displayName.localeCompare(b.displayName, "fr");

export const useUserManagement = () => {
  const { user: currentUser } = useCurrentUser();
  const [users, setUsers] = useState<User[] | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { isLoading, error, request: fetchUsers } = useApi(UserListSchema, {
    onError: (err) => {
      // The route guard hides the page from Agents, but the backend is the one that decides.
      if (isApiError(err, 403)) {
        setIsForbidden(true);
        return true;
      }
      return false;
    },
  });

  // Set by a 404 on delete: the user no longer exists, so its row is dropped too.
  const alreadyGoneRef = useRef(false);
  const { isLoading: isDeleting, request: deleteRequest } = useApi(EmptyResponseSchema, {
    onError: (err) => {
      alreadyGoneRef.current = isApiError(err, 404);
      const message = getUserErrorMessage(err);
      if (message) {
        toast.error(message);
        return true;
      }
      return false;
    },
  });

  const loadUsers = useCallback(async () => {
    const result = await fetchUsers({ method: "GET", url: USERS_ROUTE });
    if (result) {
      setUsers([...result].sort(byDisplayName));
    }
  }, [fetchUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Mirrors the backend rules: only Agents can be deleted, and never one's own account.
  const canDelete = (user: User) =>
    user.role === ROLES.AGENT && user.id.toLowerCase() !== currentUser?.id.toLowerCase();

  const openCreate = useCallback(() => setIsCreateOpen(true), []);
  const closeCreate = useCallback(() => setIsCreateOpen(false), []);

  const onUserCreated = useCallback((created: User) => {
    setUsers((prev) => [...(prev ?? []), created].sort(byDisplayName));
    setIsCreateOpen(false);
    // The role is assigned in the background: the welcome email leaves once it is (spec 5.8).
    toast.success(
      `${created.displayName} a été créé. Son rôle est en cours d'attribution : actualisez la liste pour suivre son statut.`
    );
  }, []);

  const askDelete = (user: User) => setUserToDelete(user);
  const cancelDelete = useCallback(() => setUserToDelete(null), []);

  const confirmDelete = async () => {
    if (!userToDelete) {
      return;
    }

    const target = userToDelete;
    alreadyGoneRef.current = false;
    // useApi resolves null on error and the parsed (undefined) body on success.
    const result = await deleteRequest({ method: "DELETE", url: userByIdRoute(target.id) });
    setUserToDelete(null);

    if (result !== null || alreadyGoneRef.current) {
      setUsers((prev) => prev?.filter((user) => user.id !== target.id) ?? prev);
    }
    if (result !== null) {
      toast.success(`${target.displayName} a été supprimé.`);
    }
  };

  return {
    users,
    isLoading,
    hasError: error !== null && !isForbidden,
    isForbidden,
    retry: loadUsers,
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
  };
};
