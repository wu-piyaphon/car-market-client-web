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
  // Car related endpoints
  CARS: {
    LIST: "/cars",
    DETAIL: (slug: string) => `/cars/slug/${slug}`,
    FILTERS: "/cars-filter",
  },

  CAR_TYPES: {
    LIST: "/car-types",
  },

  // Car valuation endpoints
  VALUATION: {
    CALCULATE: "/valuation/calculate",
    HISTORY: "/valuation/history",
  },

  // Car selling endpoints
  SELLING: {
    SUBMIT: "/selling-requests",
    UPLOAD_IMAGES: "/car-selling/upload",
  },

  // Loan calculator endpoints
  LOAN: {
    CALCULATE: "/loan/calculate",
    RATES: "/loan/rates",
  },

  // Contact endpoints
  CONTACT: {
    SUBMIT: "/contact/submit",
  },
} as const;
