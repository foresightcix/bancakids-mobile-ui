import Constants from "expo-constants";
import { useAuthStore } from "@/store/auth";

const getApiUrl = () =>
  Constants.expoConfig?.extra?.apiUrl as string | undefined;

export const isMock = () => !getApiUrl();

export type RequestOptions = RequestInit & {
  /** No envía Authorization (p. ej. login antes de tener token). */
  skipAuth?: boolean;
};

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const apiUrl = getApiUrl();
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
