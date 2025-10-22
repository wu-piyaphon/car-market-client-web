import type { Metadata } from "next";
import CarSearchList from "@/components/sections/cars/list/car-search-list";
import { CONFIG } from "@/global-config";
import { CAR_LIST_FALLBACK } from "@/lib/constants/car.constants";
import {
  CAR_FILTER_DEFAULT_VALUES,
  CAR_FILTER_OPTIONS_FALLBACK,
} from "@/lib/constants/car-filter.constants";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import { carFilterSchema } from "@/lib/schemas/car-filter-schema";
import { getCarFilters, getCars } from "@/services";

// ----------------------------------------------------------------------

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${CONFIG.appName} | รายการรถยนต์`,
};

// ----------------------------------------------------------------------

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_PAGE_SIZE = 8;

// ----------------------------------------------------------------------

export default async function Page({ searchParams }: PageProps) {
  try {
    const rawSearchParams = await searchParams;

    const validatedParams = carFilterSchema.safeParse(rawSearchParams);
    const searchParamValues: CarFilterSchema = validatedParams.success
      ? { ...CAR_FILTER_DEFAULT_VALUES, ...validatedParams.data }
      : CAR_FILTER_DEFAULT_VALUES;

    const [initialFilters, initialCars] = await Promise.all([
      getCarFilters(searchParamValues),
      getCars({
        ...searchParamValues,
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      }),
    ]);

    if (!initialCars.success || !initialFilters.success) {
      return (
        <CarSearchList
          queryParams={searchParamValues}
          filterOptions={CAR_FILTER_OPTIONS_FALLBACK}
          initialCars={CAR_LIST_FALLBACK}
        />
      );
    }

    return (
      <CarSearchList
        queryParams={searchParamValues}
        filterOptions={initialFilters.data}
        initialCars={initialCars.data}
      />
    );
  } catch (error) {
    console.error("Error processing search parameters:", error);
    throw new Error("Critical error: Unable to load the cars page");
  }
}
