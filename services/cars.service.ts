import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { APIRequestOptions } from "@/lib/api/server-fetcher";
import { buildSearchParams } from "@/lib/params";
import type { GetCarsQueryParams, GetCarsResponse } from "@/types/car.types";

export async function getCars(
  params?: GetCarsQueryParams,
  options?: APIRequestOptions,
) {
  try {
    const searchParams = params
      ? buildSearchParams(params)
      : new URLSearchParams();

    const endpoint = `${API_ENDPOINTS.CARS.LIST}?${searchParams.toString()}`;
    const response = await fetcher.get<GetCarsResponse>(endpoint, options);

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

export async function getCarBySlug(slug: string) {
  try {
    const response = await fetcher.get(API_ENDPOINTS.CARS.DETAIL(slug));

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
