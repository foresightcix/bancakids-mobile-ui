import { create } from "zustand";
import type { Parent } from "@/types";

interface AuthState {
  user: Parent | null;
  token: string | null;
  setSession: (user: Parent, token: string) => void;
  setToken: (token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setSession: (user, token) => set({ user, token }),
  setToken: (token) => set({ token }),
  clearSession: () => set({ user: null, token: null }),
}));
