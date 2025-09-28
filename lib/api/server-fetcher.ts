import { API_CONFIG } from "./config";
import { APIError, createAPIError, NetworkError, TimeoutError } from "./errors";

export type APIRequestOptions = RequestInit & {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  // Custom headers that will be merged with defaults
  customHeaders?: Record<string, string>;
};

export type APIResponse<T = unknown> = {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
};

class ServerAPIFetcher {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL.replace(/\/$/, ""); // Remove trailing slash
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
  }

  /**
   * Create AbortController with timeout
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();

    setTimeout(() => {
      controller.abort();
    }, timeout);

    return controller;
  }

  /**
   * Merge headers with defaults
   */
  private mergeHeaders(customHeaders?: Record<string, string>): HeadersInit {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    };
  }

  /**
   * Sleep utility for retries
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Core fetch method with error handling and retries
   */
  private async fetchWithRetry(
    url: string,
    options: APIRequestOptions = {},
  ): Promise<Response> {
    const {
      timeout = API_CONFIG.TIMEOUT,
      retries = API_CONFIG.RETRY.ATTEMPTS,
      retryDelay = API_CONFIG.RETRY.DELAY,
      customHeaders,
      ...fetchOptions
    } = options;

    const controller = this.createTimeoutController(timeout);
    const headers = this.mergeHeaders(customHeaders);

    const requestOptions: RequestInit = {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    };

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);

        // Don't retry on successful responses or client errors (4xx)
        if (response.ok || (response.status >= 400 && response.status < 500)) {
          return response;
        }

        // Server error (5xx) - retry
        if (attempt === retries) {
          return response; // Last attempt, return even if failed
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error");

        // Don't retry on abort (timeout) or network errors on last attempt
        if (attempt === retries) {
          if (error instanceof Error && error.name === "AbortError") {
            throw new TimeoutError();
          }
          throw new NetworkError(lastError.message);
        }
      }

      // Wait before retry
      if (attempt < retries) {
        await this.sleep(retryDelay * (attempt + 1)); // Exponential backoff
      }
    }

    throw lastError || new NetworkError("Request failed after retries");
  }

  /**
   * Process response and handle errors
   */
  private async processResponse<T>(
    response: Response,
  ): Promise<APIResponse<T>> {
    // Handle non-2xx responses
    if (!response.ok) {
      let errorDetails: unknown;

      try {
        // Try to parse error details from response body
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          errorDetails = await response.json();
        } else {
          errorDetails = await response.text();
        }
      } catch {
        // Ignore parsing errors
      }

      throw createAPIError(response, undefined, errorDetails);
    }

    // Parse successful response
    let data: T;

    try {
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        // For non-JSON responses, return as text
        data = (await response.text()) as unknown as T;
      }
    } catch (error) {
      throw new APIError(
        "Failed to parse response",
        response.status,
        "PARSE_ERROR",
        error,
      );
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
      ok: response.ok,
    };
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    options: APIRequestOptions = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.fetchWithRetry(url, {
      method: "GET",
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options: APIRequestOptions = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.fetchWithRetry(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options: APIRequestOptions = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.fetchWithRetry(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options: APIRequestOptions = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.fetchWithRetry(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    endpoint: string,
    options: APIRequestOptions = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.fetchWithRetry(url, {
      method: "DELETE",
      ...options,
    });

    return this.processResponse<T>(response);
  }
}

/**
 * Default server API instance
 */
export const serverAPI = new ServerAPIFetcher();

/**
 * Create a new API fetcher with custom base URL (for different services)
 */
export function createAPIFetcher(baseURL: string): ServerAPIFetcher {
  return new ServerAPIFetcher(baseURL);
}
