import { useCallback, useEffect, useState } from "react";
import type {
  PaginationParams,
  PaginationResponse,
} from "@/types/common.types";
import type { ServiceResponse } from "@/types/service.types";

// ----------------------------------------------------------------------

type UseInfiniteScrollParams<T> = {
  ref: React.RefObject<HTMLDivElement | null>;
  fetchFn: (
    params: PaginationParams<Record<string, unknown>>,
  ) => ServiceResponse<PaginationResponse<T>>;
  queryParams?: Record<string, unknown>;
  initialData: PaginationResponse<T>;
};

type UseInfiniteScrollReturn<T> = {
  items: T[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
};

// ----------------------------------------------------------------------

export function useInfiniteScroll<T>(
  params: UseInfiniteScrollParams<T>,
): UseInfiniteScrollReturn<T> {
  const { ref, fetchFn, queryParams = {}, initialData } = params;

  const pageSize = initialData.pageSize;

  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: initialData.page,
    items: initialData.items,
    total: initialData.total,
    hasMore: initialData.page * initialData.pageSize < initialData.total,
  });

  const loadMoreItems = useCallback(
    async (nextPage: number) => {
      if (isLoading || !pagination.hasMore) return;

      setIsLoading(true);

      try {
        const pageData = await fetchFn({
          page: nextPage,
          pageSize,
          ...queryParams,
        } as PaginationParams<Record<string, unknown>>);

        if (!pageData.success) {
          console.error("Failed to fetch data:", pageData.error);
          setIsLoading(false);
          return;
        }

        const {
          page: newPage,
          items: newItems,
          total: newTotal,
          pageSize: newPageSize,
        } = pageData.data;

        setPagination((prev) => ({
          page: newPage,
          items: [...prev.items, ...newItems],
          total: newTotal,
          hasMore: newPage * newPageSize < newTotal,
        }));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, fetchFn, pageSize, queryParams, pagination.hasMore],
  );

  // ----------------------------------------------------------------------

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!pagination.hasMore) return;

    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !isLoading && pagination.hasMore) {
          loadMoreItems(pagination.page + 1);
        }
      },
      { threshold: 0.0 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [isLoading, loadMoreItems, ref, pagination.hasMore, pagination.page]);

  useEffect(() => {
    setPagination({
      page: initialData.page,
      items: initialData.items,
      total: initialData.total,
      hasMore: initialData.page * initialData.pageSize < initialData.total,
    });
  }, [initialData]);

  // ----------------------------------------------------------------------

  return {
    items: pagination.items,
    hasMore: pagination.hasMore,
    total: pagination.total,
    isLoading,
  };
}
