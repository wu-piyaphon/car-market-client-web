import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { APIRequestOptions } from "@/lib/api/server-fetcher";
import { buildQueryString } from "@/lib/params";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import type {
  CarDetail,
  GetCarsQueryParams,
  GetCarsResponse,
} from "@/types/car.types";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";
import type { ServiceResponse } from "@/types/service.types";

export async function getCars(
  params: GetCarsQueryParams,
  options?: APIRequestOptions,
): ServiceResponse<GetCarsResponse> {
  try {
    const url = buildQueryString(API_ENDPOINTS.CARS.LIST, params);

    const response = await fetcher.get<GetCarsResponse>(url, options);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("getCars error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch cars",
    };
  }
}

// ----------------------------------------------------------------------

export async function getCarBySlug(slug: string): ServiceResponse<CarDetail> {
  try {
    const response = await fetcher.get<CarDetail>(
      API_ENDPOINTS.CARS.DETAIL(slug),
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("getCarBySlug error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car",
    };
  }
}

// ----------------------------------------------------------------------

export async function getCarFilters(
  query?: CarFilterSchema,
  options?: APIRequestOptions,
): ServiceResponse<GetCarFiltersResponse> {
  try {
    const url = buildQueryString(API_ENDPOINTS.CARS.FILTERS, { ...query });

    const response = await fetcher.get<GetCarFiltersResponse>(url, options);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("getCarFilters error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch filters",
    };
  }
}
