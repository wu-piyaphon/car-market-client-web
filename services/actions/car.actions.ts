"use server";

import { API_ENDPOINTS, fetcher } from "@/lib/api";
import { buildSearchParams } from "@/lib/params";
import type { GetCarsQueryParams, GetCarsResponse } from "@/types/car.types";
import type { ServiceResponse } from "@/types/service.types";

export async function getMoreCarsAction(
  params?: GetCarsQueryParams,
): ServiceResponse<GetCarsResponse> {
  try {
    const searchParams = params
      ? buildSearchParams(params)
      : new URLSearchParams();

    const endpoint = `${API_ENDPOINTS.CARS.LIST}?${searchParams.toString()}`;
    const response = await fetcher.get<GetCarsResponse>(endpoint);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("getMoreCars error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch cars",
    };
  }
}
