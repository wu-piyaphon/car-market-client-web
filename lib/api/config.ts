import { CONFIG } from "@/global-config";

export const API_CONFIG = {
  // Base URL from environment variables
  BASE_URL: CONFIG.baseUrl || "http://localhost:3001",

  // Default timeout for requests (in milliseconds)
  TIMEOUT: 10000,

  // Default headers for all requests
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Cache settings
  CACHE: {
    // Default cache time for static data (5 minutes)
    DEFAULT_REVALIDATE: 300,
    // Short cache for dynamic data (1 minute)
    SHORT_REVALIDATE: 60,
    // Long cache for rarely changing data (1 hour)
    LONG_REVALIDATE: 3600,
  },

  // Rate limiting settings
  RETRY: {
    ATTEMPTS: 3,
    DELAY: 1000, // 1 second
  },
} as const;

export const API_ENDPOINTS = {
  CARS: {
    LIST: "/cars",
    DETAIL: (slug: string) => `/cars/slug/${slug}`,
    FILTERS: "/cars-filter",
  },
  VALUATION: {
    SUBMIT: "/estimate-requests",
  },
  SELLING: {
    SUBMIT: "/selling-requests",
  },
  BRANDS: {
    LIST: "/car-brands",
  },
} as const;
