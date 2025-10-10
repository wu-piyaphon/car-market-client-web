import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { BrandOption } from "@/types/brand.types";
import type { ServiceResponse } from "@/types/service.types";

export async function getCarBrands(): ServiceResponse<BrandOption[]> {
  try {
    const response = await fetcher.get<BrandOption[]>(
      API_ENDPOINTS.BRANDS.LIST,
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("getCarBrands error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch filters",
    };
  }
}
