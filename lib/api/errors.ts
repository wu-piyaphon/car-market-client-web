export class APIError extends Error {
  public status: number;
  public code: string;
  public details?: unknown;

  constructor(
    message: string,
    status: number = 500,
    code: string = "API_ERROR",
    details?: unknown,
  ) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

export class NetworkError extends APIError {
  constructor(message: string = "Network request failed") {
    super(message, 0, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class TimeoutError extends APIError {
  constructor(message: string = "Request timeout") {
    super(message, 408, "TIMEOUT_ERROR");
    this.name = "TimeoutError";
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = "Unauthorized access") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

/**
 * Error factory function to create appropriate error instances
 */
export function createAPIError(
  response: Response,
  message?: string,
  details?: unknown,
): APIError {
  const status = response.status;
  const defaultMessage = message || `HTTP ${status}: ${response.statusText}`;

  switch (status) {
    case 400:
      return new ValidationError(defaultMessage, details);
    case 401:
      return new UnauthorizedError(defaultMessage);
    case 404:
      return new NotFoundError(defaultMessage);
    case 408:
      return new TimeoutError(defaultMessage);
    default:
      return new APIError(defaultMessage, status, "HTTP_ERROR", details);
  }
}

/**
 * Type guard to check if error is an APIError
 */
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

/**
 * Extract error message for user display
 */
export function getErrorMessage(error: unknown): string {
  if (isAPIError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
