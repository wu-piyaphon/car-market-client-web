import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PaginationParams,
  PaginationResponse,
} from "@/types/common.types";
import type { ServiceResponse } from "@/types/service.types";

// ----------------------------------------------------------------------

const DEFAULT_PAGE_SIZE = 12;

type UseInfiniteScrollParams<T, Q extends Record<string, unknown>> = {
  ref: React.RefObject<HTMLDivElement | null>;
  fetchFn: (
    params: PaginationParams<Q>,
  ) => ServiceResponse<PaginationResponse<T>>;
  queryParams: Q;
  pageSize?: number;
};

type UseInfiniteScrollReturn<T> = {
  items: T[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
};

type PaginationState<T> = {
  page: number;
  items: T[];
  total: number;
  hasMore: boolean;
};

// ----------------------------------------------------------------------

export function useInfiniteScroll<T, Q extends Record<string, unknown>>(
  params: UseInfiniteScrollParams<T, Q>,
): UseInfiniteScrollReturn<T> {
  const { ref, fetchFn, queryParams, pageSize = DEFAULT_PAGE_SIZE } = params;

  // Serialize queryParams to use as a stable key for resetting
  const queryKey = JSON.stringify(queryParams);

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [pagination, setPagination] = useState<PaginationState<T>>({
    page: 0,
    items: [],
    total: 0,
    hasMore: true,
  });

  // Use refs to avoid stale closures and infinite loops
  const currentQueryKeyRef = useRef(queryKey);
  const isLoadingRef = useRef(false);
  const fetchFnRef = useRef(fetchFn);
  const queryParamsRef = useRef(queryParams);
  const pageSizeRef = useRef(pageSize);

  // Keep refs up to date
  fetchFnRef.current = fetchFn;
  queryParamsRef.current = queryParams;
  pageSizeRef.current = pageSize;

  // ----------------------------------------------------------------------

  const loadItems = useCallback(
    async (nextPage: number, isReset: boolean, expectedQueryKey: string) => {
      // Prevent concurrent requests
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;

      if (isReset) {
        setIsInitialLoading(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await fetchFnRef.current({
          page: nextPage,
          pageSize: pageSizeRef.current,
          ...queryParamsRef.current,
        } as PaginationParams<Q>);

        // Check if query has changed during the request (race condition prevention)
        if (currentQueryKeyRef.current !== expectedQueryKey) {
          return;
        }

        if (!response.success) {
          console.error("Failed to fetch data:", response.error);
          return;
        }

        const {
          page: newPage,
          items: newItems,
          total: newTotal,
          pageSize: newPageSize,
        } = response.data;

        setPagination((prev) => ({
          page: newPage,
          items: isReset ? newItems : [...prev.items, ...newItems],
          total: newTotal,
          hasMore: newPage * newPageSize < newTotal,
        }));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    },
    [],
  );

  // ----------------------------------------------------------------------

  // Reset and fetch page 1 when queryParams change
  useEffect(() => {
    currentQueryKeyRef.current = queryKey;

    // Reset state
    setPagination({
      page: 0,
      items: [],
      total: 0,
      hasMore: true,
    });

    // Fetch first page
    loadItems(1, true, queryKey);
  }, [queryKey, loadItems]);

  // ----------------------------------------------------------------------

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!pagination.hasMore || isLoading || isInitialLoading) return;

    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          !isLoadingRef.current &&
          pagination.hasMore
        ) {
          loadItems(pagination.page + 1, false, currentQueryKeyRef.current);
        }
      },
      { threshold: 0.5, rootMargin: "200px" },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    ref,
    pagination.hasMore,
    pagination.page,
    isLoading,
    isInitialLoading,
    loadItems,
  ]);

  // ----------------------------------------------------------------------

  return {
    items: pagination.items,
    hasMore: pagination.hasMore,
    total: pagination.total,
    isLoading,
    isInitialLoading,
  };
}
