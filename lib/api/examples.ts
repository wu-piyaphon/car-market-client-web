/**
 * API Usage Examples
 *
 * This file demonstrates how to use the centralized API fetchers
 * in different scenarios within your car market application.
 */

import { API_ENDPOINTS, fetcher, getErrorMessage, isAPIError } from "./index";

// ========================================
// SERVER-SIDE USAGE (Recommended)
// ========================================

/**
 * Example 1: Server Action for fetching cars
 * Use this pattern for most data fetching
 */
export async function fetchCarsExample() {
  try {
    // Using the centralized API fetcher
    const response = await fetcher.get<{ cars: Car[]; total: number }>(
      API_ENDPOINTS.CARS.LIST + "?page=1&limit=20",
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to fetch cars:", error);

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Example 2: Server Action with POST request
 */
export async function submitCarValuationExample(
  valuationData: ValuationFormData,
) {
  try {
    const response = await fetcher.post<{ estimatedValue: number }>(
      API_ENDPOINTS.VALUATION.SUBMIT,
      valuationData,
    );

    return {
      success: true,
      estimatedValue: response.data.estimatedValue,
    };
  } catch (error) {
    // Structured error handling
    if (isAPIError(error)) {
      console.error(`API Error ${error.status}:`, error.message);

      // Handle specific error types
      if (error.status === 400) {
        return {
          success: false,
          error: "Please check your input data",
        };
      }
    }

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Example 3: Server Component usage
 */
export async function ServerComponentExample() {
  try {
    // Fetch data in server component
    const [carsResponse] = await Promise.all([
      fetcher.get(API_ENDPOINTS.CARS.LIST + "?featured=true&limit=6"),
    ]);

    return {
      cars: carsResponse.data,
    };
  } catch (error) {
    console.error("Server component data fetch failed:", error);

    // Return empty data or throw based on your needs
    return {
      cars: [],
    };
  }
}

// ========================================
// CLIENT-SIDE USAGE (Minimal)
// ========================================

/**
 * Example 4: Client-side infinite loading
 * Use client API sparingly, only for specific interactions
 */
/*
'use client'

import { clientFetcher } from './index'

export async function loadMoreCarsExample(page: number) {
  try {
    const cars = await clientFetcher.get<{ cars: Car[] }>(
      `${API_ENDPOINTS.CARS.LIST}?page=${page}&limit=10`
    )
    
    return cars.cars
  } catch (error) {
    console.error('Failed to load more cars:', error)
    throw error
  }
}
*/

// ========================================
// CUSTOM CONFIGURATIONS
// ========================================

/**
 * Example 5: Custom timeout and headers
 */
export async function fetchWithCustomOptionsExample() {
  try {
    const response = await fetcher.get("/cars/premium", {
      timeout: 15000, // 15 seconds
      customHeaders: {
        "X-Premium-Request": "true",
      },
    });

    return response.data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

/**
 * Example 6: File upload (multipart/form-data)
 */
export async function uploadCarImagesExample(formData: FormData) {
  try {
    const response = await fetcher.post(
      API_ENDPOINTS.SELLING.SUBMIT,
      undefined, // No JSON body for FormData
      {
        customHeaders: {
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData, // Pass FormData directly
      },
    );

    return response.data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

// ========================================
// TYPE DEFINITIONS (for examples)
// ========================================

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
};

type ValuationFormData = {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
};
