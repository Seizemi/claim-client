import { create } from "zustand";
import { CurrentUser } from "features/auth/types/currentUser";

// Filled once by AuthGate from GET /api/me. The session cookie itself is HttpOnly and never
// readable here: this is only who the backend says the user is, for display and UI checks.
interface CurrentUserState {
  user: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
