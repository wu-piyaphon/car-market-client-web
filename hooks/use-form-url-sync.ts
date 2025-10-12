"use client";

import { useRouter } from "next/navigation";
import {
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDeepCompareEffect } from "./use-deep-effect";

type UseFormUrlSyncOptions<T> = {
  values: T;
  defaultValues: T;
  basePath: string;
  delay?: number;
  startTransition?: TransitionStartFunction;
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
  startTransition,
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

      if (startTransition) {
        startTransition(() => {
          router.replace(newUrl, { scroll: false });
        });
      } else {
        router.replace(newUrl, { scroll: false });
      }
    },
    [router, buildSearchParams, basePath, startTransition],
  );

  useDeepCompareEffect(() => {
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
