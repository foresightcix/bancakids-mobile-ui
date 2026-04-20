import { create } from "zustand";

interface SessionState {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useSession = create<SessionState>((set) => ({
  isAuthenticated: false,
  isOnboarded: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, isOnboarded: false }),
  completeOnboarding: () => set({ isOnboarded: true }),
}));
