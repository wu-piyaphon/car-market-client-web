"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import Form from "@/components/hook-forms/form";
import Container from "@/components/layout/container";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useResponsive } from "@/hooks/use-responsive";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "@/lib/schemas/car-filter-schema";
import { getMoreCarsAction } from "@/services/actions/car.actions";
import type { CarListItem, GetCarsResponse } from "@/types/car.types";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";
import CarFilterMobile from "../filter/car-filter-mobile";
import CarFilterSidebar from "../filter/car-filter-sidebar";
import CarList from "./car-list";
import CarListMobile from "./car-list-mobile";

type CarSearchListProps = {
  queryParams: CarFilterSchema;
  filterOptions: GetCarFiltersResponse;
  initialCars?: GetCarsResponse;
};

export default function CarSearchList({
  queryParams,
  filterOptions,
  initialCars,
}: CarSearchListProps) {
  const { replace } = useRouter();
  const { isMobile } = useResponsive();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const activeRef = isMobile ? mobileRef : desktopRef;

  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: queryParams,
  });

  const { reset, setValue } = methods;

  useEffect(() => {
    reset(queryParams);
  }, [queryParams, reset]);

  const { items, isLoading, isInitialLoading, hasMore, total } =
    useInfiniteScroll<CarListItem, CarFilterSchema>({
      ref: activeRef,
      fetchFn: getMoreCarsAction,
      queryParams: queryParams as CarFilterSchema,
      initialData: initialCars,
    });

  const handleSearch = useDebouncedCallback(
    (key: string, val: string | string[]) => {
      const params = new URLSearchParams(searchParams);

      if (val) {
        if (Array.isArray(val)) {
          params.delete(key);
          val.forEach((v) => {
            params.append(key, v);
          });
        } else {
          params.set(key, val);
        }

        if (key === "type") {
          params.delete("category");
          setValue("category", "");
        }

        if (key === "category") {
          params.delete("type");
          setValue("type", "");
        }

        if (key === "category" && val === "ALL") {
          params.delete("category");
          params.delete("type");
          setValue("category", "");
          setValue("type", "");
        }
      } else {
        params.delete(key);

        if (key === "model") {
          params.delete("subModel");
          setValue("subModel", "");
        }
      }

      replace(`${pathname}?${params.toString()}`);
    },
    200,
  );

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods}>
      {/* -- Mobile -- */}
      <Container className="mb-2 md:hidden">
        <CarFilterMobile
          filterOptions={filterOptions}
          onSearch={handleSearch}
        />
        <CarListMobile
          ref={mobileRef}
          total={total}
          items={items}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
          hasMore={hasMore}
        />
      </Container>

      {/* -- Tablet/Desktop -- */}
      <Container className="my-12 hidden flex-row md:flex md:gap-5 lg:gap-6">
        <CarFilterSidebar
          filterOptions={filterOptions}
          onSearch={handleSearch}
        />
        <CarList
          ref={desktopRef}
          items={items}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
          hasMore={hasMore}
          onSearch={handleSearch}
        />
      </Container>
    </Form>
  );
}
