import { useState } from "react";
import { api } from "@/api";
import { useAuthStore } from "@/store/auth";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const child = useAuthStore((s) => s.child);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const login = (email: string, password: string) =>
    run(() => api.login(email, password).then(() => undefined));

  const refreshToken = () => run(() => api.refreshToken().then(() => undefined));

  const logout = () => run(() => api.logout());

  const ensureChild = () => {
    if (!user?.id) return;
    run(() => api.ensureActiveChild(user.id).then(() => undefined));
  };

  return {
    data: {
      user,
      token,
      child,
    },
    fn: {
      login,
      logout,
      refreshToken,
      ensureChild,
    },
    status: {
      loading,
      error,
    },
  };
}
