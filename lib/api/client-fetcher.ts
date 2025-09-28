"use client";

import { API_CONFIG } from "./config";
import { createAPIError, NetworkError, TimeoutError } from "./errors";

export type ClientAPIOptions = RequestInit & {
  timeout?: number;
  baseURL?: string;
};

class ClientAPIFetcher {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL.replace(/\/$/, "");
  }

  /**
   * Create fetch request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: ClientAPIOptions = {},
  ): Promise<Response> {
    const { timeout = API_CONFIG.TIMEOUT, baseURL, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fullURL = baseURL ? `${baseURL}${url}` : `${this.baseURL}${url}`;

      const response = await fetch(fullURL, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new TimeoutError();
      }

      throw new NetworkError(
        error instanceof Error ? error.message : "Network request failed",
      );
    }
  }

  /**
   * Process response
   */
  private async processResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorDetails: unknown;

      try {
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

    try {
      return await response.json();
    } catch {
      throw new Error("Failed to parse JSON response");
    }
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    options: ClientAPIOptions = {},
  ): Promise<T> {
    const response = await this.fetchWithTimeout(endpoint, {
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
    options: ClientAPIOptions = {},
  ): Promise<T> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.processResponse<T>(response);
  }
}

/**
 * Default client API instance
 * Use sparingly - prefer server actions
 */
export const clientAPI = new ClientAPIFetcher();

/**
 * Create custom client API fetcher
 */
export function createClientFetcher(baseURL: string): ClientAPIFetcher {
  return new ClientAPIFetcher(baseURL);
}
