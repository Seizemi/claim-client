import { useCallback, useRef, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { httpClient } from "shared/services/httpClient";

export interface UseApiOptions {
  // Return true to indicate the error was handled (suppresses the default toast).
  onError?: (error: unknown) => boolean;
}

export const useApi = <T>(schema: z.ZodType<T>, options?: UseApiOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const onErrorRef = useRef(options?.onError);
  onErrorRef.current = options?.onError;

  const request = useCallback(
    async (config: AxiosRequestConfig): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await httpClient.request(config);
        const parsed = schema.parse(response.data);
        setData(parsed);
        return parsed;
      } catch (err) {
        const message =
          err instanceof z.ZodError
            ? "Réponse du serveur invalide"
            : "Une erreur est survenue lors de la communication avec le serveur";
        const handled = onErrorRef.current?.(err) ?? false;
        if (!handled) {
          toast.error(message);
        }
        setError(err instanceof Error ? err : new Error(message));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [schema]
  );

  return { data, isLoading, error, request };
};
