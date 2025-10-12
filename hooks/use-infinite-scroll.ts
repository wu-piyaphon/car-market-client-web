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
  initialData: PaginationResponse<T>;
  queryParams?: Record<string, unknown>;
};

type UseInfiniteScrollReturn<T> = {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
};

// ----------------------------------------------------------------------

export function useInfiniteScroll<T>(
  params: UseInfiniteScrollParams<T>,
): UseInfiniteScrollReturn<T> {
  const { ref, fetchFn, initialData, queryParams = {} } = params;

  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: initialData.page,
    items: initialData.items,
    hasMore: initialData.page * initialData.pageSize < initialData.total,
  });

  const loadMoreItems = useCallback(
    async (nextPage: number) => {
      if (isLoading || !pagination.hasMore) return;

      setIsLoading(true);

      try {
        const pageData = await fetchFn({
          page: nextPage,
          pageSize: initialData.pageSize,
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
          hasMore: newPage * newPageSize < newTotal,
        }));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, fetchFn, initialData.pageSize, queryParams, pagination.hasMore],
  );

  // ----------------------------------------------------------------------

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
      hasMore: initialData.page * initialData.pageSize < initialData.total,
    });
  }, [initialData]);

  // ----------------------------------------------------------------------

  return {
    items: pagination.items,
    hasMore: pagination.hasMore,
    isLoading,
  };
}
