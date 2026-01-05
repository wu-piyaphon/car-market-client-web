import type { Metadata } from "next";
import CarSearchList from "@/components/sections/cars/list/car-search-list";
import {
  CAR_FILTER_DEFAULT_VALUES,
  CAR_FILTER_OPTIONS_FALLBACK,
} from "@/lib/constants/car-filter.constants";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "@/lib/schemas/car-filter-schema";
import { getCarFilters } from "@/services";

export const metadata: Metadata = {
  title: "ค้นหารถ",
};

type PageProps = {
  searchParams: Promise<CarFilterSchema>;
};

export default async function Page({ searchParams }: PageProps) {
  const rawSearchParams = await searchParams;

  const validatedParams = carFilterSchema.safeParse(rawSearchParams);
  const searchParamValues: CarFilterSchema = validatedParams.success
    ? { ...CAR_FILTER_DEFAULT_VALUES, ...validatedParams.data }
    : CAR_FILTER_DEFAULT_VALUES;

  const initialFilters = await getCarFilters(searchParamValues);

  return (
    <CarSearchList
      queryParams={searchParamValues}
      filterOptions={
        initialFilters.success
          ? initialFilters.data
          : CAR_FILTER_OPTIONS_FALLBACK
      }
    />
  );
}
