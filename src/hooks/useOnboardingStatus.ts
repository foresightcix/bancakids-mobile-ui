import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const KEY = "hasCompletedOnboarding";

/**
 * Hook que lee/escribe el flag `hasCompletedOnboarding` en AsyncStorage.
 * Se usa para gating del flujo de primera vez (Yape/Prioridades/Pairing/WiFi).
 *
 * - `loading: true` mientras se rehidrata desde el storage en el primer mount.
 * - `hasCompleted` refleja el valor actual (reactivo dentro de este hook).
 * - `markCompleted()` persiste `"true"` y actualiza el estado.
 * - `reset()` elimina el flag — útil para "Resetear demo" desde ajustes.
 */
export function useOnboardingStatus() {
  const [loading, setLoading] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(KEY)
      .then((val) => {
        if (cancelled) return;
        setHasCompleted(val === "true");
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setHasCompleted(false);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const markCompleted = useCallback(async () => {
    await AsyncStorage.setItem(KEY, "true");
    setHasCompleted(true);
  }, []);

  const reset = useCallback(async () => {
    await AsyncStorage.removeItem(KEY);
    setHasCompleted(false);
  }, []);

  return { hasCompleted, loading, markCompleted, reset };
}

/** Lectura puntual fuera de React (ej. handlers). No hidrata estado. */
export async function getHasCompletedOnboarding(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(KEY);
    return val === "true";
  } catch {
    return false;
  }
}

/** Set puntual fuera de React. */
export async function setHasCompletedOnboarding(value: boolean) {
  if (value) await AsyncStorage.setItem(KEY, "true");
  else await AsyncStorage.removeItem(KEY);
}
