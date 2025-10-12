import { useCallback, useEffect, useState } from "react";
import type {
  PaginationParams,
  PaginationResponse,
} from "@/types/common.types";
import type { ServiceResponse } from "@/types/service.types";
import { useDeepCompareEffect } from "./use-deep-effect";

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

  const {
    items: initialItems,
    page: initialPage,
    pageSize: initialPageSize,
    total: initialTotal,
  } = initialData;

  const [hasMore, setHasMore] = useState(
    initialPage * initialPageSize < initialTotal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>(initialItems);

  const loadMoreItems = useCallback(
    async (nextPage: number) => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);

      try {
        const paginated = await fetchFn({
          page: nextPage,
          pageSize: initialPageSize,
          ...queryParams,
        } as PaginationParams<Record<string, unknown>>);

        if (!paginated.success) {
          console.error("Failed to fetch data:", paginated.error);
          setIsLoading(false);
          return;
        }

        const {
          page: newPage,
          items: newItems,
          total: newTotal,
          pageSize: newPageSize,
        } = paginated.data;

        const newHasMore = newPage * newPageSize < newTotal;

        setItems((prevItems: T[]) => [...prevItems, ...newItems]);
        setHasMore(newHasMore);
        setPage(newPage);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore, fetchFn, initialPageSize, queryParams],
  );

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (!hasMore) return;

    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !isLoading && hasMore) {
          loadMoreItems(page + 1);
        }
      },
      { threshold: 0.0 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore, isLoading, page, loadMoreItems, ref]);

  useDeepCompareEffect(() => {
    setItems(initialData.items);
    setPage(initialData.page);
    setHasMore(initialData.page * initialData.pageSize < initialData.total);
  }, [initialData, queryParams]);

  // ----------------------------------------------------------------------

  return {
    items,
    hasMore,
    isLoading,
  };
}
