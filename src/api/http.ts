import Constants from "expo-constants";
import { Platform } from "react-native";
import { useAuthStore } from "@/store/auth";

const getConfiguredApiUrl = () =>
  Constants.expoConfig?.extra?.apiUrl as string | undefined;

/** En web usa el proxy de Metro (`/api`) para evitar CORS en el navegador. */
const resolveApiUrl = () => {
  const configured = getConfiguredApiUrl();
  if (!configured) return undefined;
  if (Platform.OS === "web") return "/api";
  return configured;
};

export const isMock = () => !getConfiguredApiUrl();

export type RequestOptions = RequestInit & {
  /** No envía Authorization (p. ej. login antes de tener token). */
  skipAuth?: boolean;
};

export async function request<T>(
  path: string,
  options: RequestOptions = {},
  idempotency_key: string|null = null
): Promise<T> {
  const apiUrl = resolveApiUrl();
  if (!apiUrl) {
    throw new Error("API_URL not configured");
  }

  const { skipAuth, headers: initHeaders, ...init } = options;
  const token = useAuthStore.getState().token;
  const headers = new Headers(initHeaders);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (!skipAuth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (idempotency_key) {
    headers.set("idempotency_key", idempotency_key);
  }

  const response = await fetch(`${apiUrl}${path}`, { ...init, headers });

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/** Ejecuta mock o llamada real según `isMock()`. */
export async function withBackend<T>(
  mock: () => Promise<T>,
  live: () => Promise<T>,
): Promise<T> {
  if (isMock()) return mock();
  return live();
}
