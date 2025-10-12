"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type UseFormUrlSyncOptions<T> = {
  values: T;
  defaultValues: T;
  basePath: string;
  delay?: number;
};

/**
 * Custom hook for syncing form values to URL parameters with debouncing
 *
 * @param options Configuration options for URL sync
 * @returns void
 *
 * @example
 * ```tsx
 * const watchedValues = useWatch({ control: methods.control });
 *
 * useFormUrlSync({
 *   values: watchedValues,
 *   defaultValues: CAR_FILTER_DEFAULT_VALUES,
 *   basePath: "/cars",
 *   delay: 500
 * });
 * ```
 */
export function useFormUrlSync<T extends Record<string, unknown>>({
  values,
  defaultValues,
  basePath,
  delay = 0,
}: UseFormUrlSyncOptions<T>) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const buildSearchParams = useCallback(
    (formValues: T) => {
      const params = new URLSearchParams();

      Object.entries(formValues || {}).forEach(([key, value]) => {
        const defaultValue = defaultValues[key as keyof T];

        // Standard sync condition for string values
        const shouldSyncValue =
          value &&
          typeof value === "string" &&
          value.trim() !== "" &&
          value !== defaultValue;

        if (shouldSyncValue) {
          params.set(key, (value as string).trim());
        }
      });

      return params;
    },
    [defaultValues],
  );

  const updateUrl = useCallback(
    (formValues: T) => {
      const params = buildSearchParams(formValues);
      const newUrl = params.toString()
        ? `${basePath}?${params.toString()}`
        : basePath;

      router.replace(newUrl, { scroll: false });
    },
    [router, buildSearchParams, basePath],
  );

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce URL updates
    timeoutRef.current = setTimeout(() => {
      updateUrl(values);
    }, delay);

    // Cleanup timeout
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [values, updateUrl, delay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
