import type { Metadata } from "next";
import { Suspense } from "react";
import CarSearchList from "@/components/sections/cars/list/car-search-list";
import { CONFIG } from "@/global-config";
import { CAR_FILTER_DEFAULT_VALUES } from "@/lib/constants/car-filter.constants";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import { carFilterSchema } from "@/lib/schemas/car-filter-schema";
import { getCarFilters, getCars } from "@/services";
import Loading from "../loading";

// ----------------------------------------------------------------------

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${CONFIG.appName} | รายการรถยนต์`,
};

// ----------------------------------------------------------------------

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_PAGESIZE = 8;

// ----------------------------------------------------------------------

export default async function Page({ searchParams }: PageProps) {
  try {
    const rawSearchParams = await searchParams;

    const validatedParams = carFilterSchema.safeParse(rawSearchParams);
    const searchParamValues: CarFilterSchema = validatedParams.success
      ? { ...CAR_FILTER_DEFAULT_VALUES, ...validatedParams.data }
      : CAR_FILTER_DEFAULT_VALUES;

    const getFiltersPromise = getCarFilters(searchParamValues);
    const getCarsPromise = getCars({
      ...searchParamValues,
      page: 1,
      pageSize: DEFAULT_PAGESIZE,
    });

    return (
      <Suspense fallback={<Loading />}>
        <CarSearchList
          getCarsPromise={getCarsPromise}
          getFiltersPromise={getFiltersPromise}
          queryParams={searchParamValues}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error processing search parameters:", error);
    throw new Error("Critical error: Unable to load the cars page");
  }
}
