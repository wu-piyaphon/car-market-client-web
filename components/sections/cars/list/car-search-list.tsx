"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import Container from "@/components/layout/container";
import { useFormUrlSync } from "@/hooks/use-form-url-sync";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useResponsive } from "@/hooks/use-responsive";
import { CAR_FILTER_DEFAULT_VALUES } from "@/lib/constants/car-filter.constants";
import { paths } from "@/lib/paths";
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
  data: GetCarsResponse;
  queryParams: CarFilterSchema;
  filterOptions: GetCarFiltersResponse;
};

export default function CarSearchList({
  data,
  queryParams,
  filterOptions,
}: CarSearchListProps) {
  const { isMobile } = useResponsive();

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const activeRef = isMobile ? mobileRef : desktopRef;

  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: queryParams,
  });

  const { control, setValue } = methods;

  const watchedValues = useWatch({
    control,
  });

  const { items, isLoading, hasMore } = useInfiniteScroll<CarListItem>({
    ref: activeRef,
    fetchFn: getMoreCarsAction,
    initialData: data,
    queryParams,
  });

  useFormUrlSync({
    values: watchedValues,
    defaultValues: CAR_FILTER_DEFAULT_VALUES,
    basePath: paths.cars.list,
    delay: 100,
  });

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (watchedValues.model === "") {
      setValue("subModel", "");
    }
  }, [watchedValues.model, setValue]);

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods}>
      {/* -- Mobile -- */}
      <Container className="mb-2 md:hidden">
        <CarFilterMobile filterOptions={filterOptions} />
        <CarListMobile
          ref={mobileRef}
          total={data.total}
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </Container>

      {/* -- Tablet/Desktop -- */}
      <Container className="my-12 hidden flex-row md:flex md:gap-5 lg:gap-6">
        <CarFilterSidebar filterOptions={filterOptions} />
        <CarList
          ref={desktopRef}
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </Container>
    </Form>
  );
}
