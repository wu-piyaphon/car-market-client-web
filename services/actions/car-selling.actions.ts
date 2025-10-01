"use server";

import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { CarSellingSchema } from "@/lib/schemas/car-selling-schema";
import type { ServiceResponse } from "@/types/service.types";

export async function submitCarSellingForm(
  payload: CarSellingSchema,
): ServiceResponse<null> {
  try {
    const endpoint = API_ENDPOINTS.SELLING.SUBMIT;
    await fetcher.post(endpoint, payload);

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit car selling form",
    };
  }
}
