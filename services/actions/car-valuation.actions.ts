"use server";

import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { ServiceResponse } from "@/types/service.types";

export async function submitCarValuationForm(
  payload: FormData,
): ServiceResponse<null> {
  try {
    const endpoint = API_ENDPOINTS.VALUATION.SUBMIT;
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
