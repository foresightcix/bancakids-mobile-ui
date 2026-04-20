import { useCallback, useEffect, useState } from "react";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

interface Result<T> {
  data: T | null;
  status: AsyncStatus;
  error: Error | null;
  /** Recarga — útil para el botón "Reintentar" del ErrorState. */
  reload: () => void;
}

/**
 * Hook genérico para consumir promesas del api. Devuelve `status` que las
 * pantallas mapean directamente a <LoadingSkeleton/> | <ErrorState/> | contenido.
 */
export function useAsyncResource<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): Result<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      setStatus("success");
    } catch (e) {
      setError(e as Error);
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  const reload = useCallback(() => {
    run();
  }, [run]);

  return { data, status, error, reload };
}
