import { useCallback, useEffect } from "react";
import { useApi } from "shared/hooks/useApi";
import { CurrentUserSchema } from "features/auth/types/currentUser";
import { useCurrentUserStore } from "features/auth/useCurrentUserStore";

const CURRENT_USER_ROUTE = "/api/me";

// Without a session, /api/me answers 401 and httpClient redirects to sign-in, so the
// request never resolves and the gate keeps showing its loader until the page leaves.
export const useAuthGate = () => {
  const user = useCurrentUserStore((state) => state.user);
  const setUser = useCurrentUserStore((state) => state.setUser);
  const { error, request } = useApi(CurrentUserSchema);

  const loadCurrentUser = useCallback(async () => {
    const currentUser = await request({ method: "GET", url: CURRENT_USER_ROUTE });
    if (currentUser) {
      setUser(currentUser);
    }
  }, [request, setUser]);

  useEffect(() => {
    if (!user) {
      loadCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, error, retry: loadCurrentUser };
};
