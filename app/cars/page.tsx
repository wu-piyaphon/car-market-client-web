import type { Metadata } from "next";
import CarSearchList from "@/components/sections/cars/list/car-search-list";
import { CONFIG } from "@/global-config";
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

const DEFAULT_PAGESIZE = 8;

const FallbackCarSearchList = () => (
  <CarSearchList
    data={{
      items: [],
      total: 0,
      page: 1,
      pageSize: DEFAULT_PAGESIZE,
    }}
    queryParams={CAR_FILTER_DEFAULT_VALUES}
    filterOptions={CAR_FILTER_OPTIONS_FALLBACK}
  />
);

// ----------------------------------------------------------------------

export default async function Page({ searchParams }: PageProps) {
  try {
    const rawSearchParams = await searchParams;

    const validatedParams = carFilterSchema.safeParse(rawSearchParams);
    const searchParamValues: CarFilterSchema = validatedParams.success
      ? { ...CAR_FILTER_DEFAULT_VALUES, ...validatedParams.data }
      : CAR_FILTER_DEFAULT_VALUES;

    const filterOptionsResult = await getCarFilters(searchParamValues, {
      cache: "no-cache",
    });
    const cars = await getCars(
      {
        ...searchParamValues,
        page: 1,
        pageSize: DEFAULT_PAGESIZE,
      },
      { cache: "no-cache" },
    );

    if (!filterOptionsResult.success) {
      console.error(
        "Failed to fetch filter options:",
        filterOptionsResult.error,
      );

      return <FallbackCarSearchList />;
    }

    if (!cars.success) {
      console.error("Failed to fetch cars:", cars.error);

      return <FallbackCarSearchList />;
    }

    return (
      <CarSearchList
        data={cars.data}
        filterOptions={filterOptionsResult.data}
        queryParams={searchParamValues}
      />
    );
  } catch (error) {
    console.error("Error processing search parameters:", error);
    throw new Error("Critical error: Unable to load the cars page");
  }
}
