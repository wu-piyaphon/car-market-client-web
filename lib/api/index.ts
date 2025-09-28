export type { ClientAPIOptions } from "./client-fetcher";
export { clientAPI, createClientFetcher } from "./client-fetcher";
export { API_CONFIG, API_ENDPOINTS } from "./config";
export {
  APIError,
  createAPIError,
  getErrorMessage,
  isAPIError,
  NetworkError,
  NotFoundError,
  TimeoutError,
  UnauthorizedError,
  ValidationError,
} from "./errors";
export type { APIRequestOptions, APIResponse } from "./server-fetcher";
export { createAPIFetcher, serverAPI } from "./server-fetcher";

import { clientAPI } from "./client-fetcher";
import { serverAPI } from "./server-fetcher";

/**
 * Quick access to commonly used fetchers
 */

// Primary fetcher for server actions and server components (recommended)
export const fetcher = serverAPI;

// Client-side fetcher for specific interactions (use sparingly)
export const clientFetcher = clientAPI;
