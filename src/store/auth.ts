import { create } from "zustand";
import type { Child, Parent } from "@/types";

interface AuthState {
  user: Parent | null;
  child: Child | null;
  token: string | null;
  setSession: (user: Parent, token: string) => void;
  setChild: (child: Child) => void;
  setToken: (token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  child: null,
  token: null,
  setSession: (user, token) => set({ user, token }),
  setChild: (child) => set({ child }),
  setToken: (token) => set({ token }),
  clearSession: () => set({ user: null, child: null, token: null }),
}));
