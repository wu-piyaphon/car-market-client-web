"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import Container from "@/components/layout/container";
import { useFormUrlSync } from "@/hooks/use-form-url-sync";
import { CAR_FILTER_DEFAULT_VALUES } from "@/lib/constants/car-filter.constants";
import { paths } from "@/lib/paths";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "@/lib/schemas/car-filter-schema";
import type { GetCarsResponse } from "@/types/car.types";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";
import CarList from "./car-list";
import CarListMobile from "./car-list-mobile";
import CarFilterMobile from "./filter/car-filter-mobile";
import CarFilterSidebar from "./filter/car-filter-sidebar";

type CarSearchListProps = {
  data: GetCarsResponse;
  searchParamValues: CarFilterSchema;
  filterOptions: GetCarFiltersResponse;
};

export default function CarSearchList({
  data,
  searchParamValues,
  filterOptions,
}: CarSearchListProps) {
  const defaultValues = { ...CAR_FILTER_DEFAULT_VALUES, ...searchParamValues };

  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues,
  });

  const watchedValues = useWatch({
    control: methods.control,
  });

  useFormUrlSync({
    values: watchedValues,
    defaultValues: CAR_FILTER_DEFAULT_VALUES,
    basePath: paths.cars.list,
    delay: 100,
  });

  return (
    <Form methods={methods}>
      {/* -- Mobile -- */}
      <Container className="mb-2 md:hidden">
        <CarFilterMobile filterOptions={filterOptions} />
        <CarListMobile total={data.total} items={data.items} />
      </Container>

      {/* -- Tablet/Desktop -- */}
      <Container className="my-12 hidden flex-row md:flex md:gap-5 lg:gap-6">
        <CarFilterSidebar filterOptions={filterOptions} />
        <CarList items={data.items} />
      </Container>
    </Form>
  );
}
