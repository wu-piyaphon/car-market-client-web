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

export type ValidationErrorDetails = {
  message: string[];
  error: string;
  statusCode: number;
};

export type APIErrorDetails = {
  message: string | string[];
  error?: string;
  statusCode?: number;
};

// Type guard to check if details is ValidationErrorDetails
function isValidationErrorDetails(
  details: unknown,
): details is ValidationErrorDetails {
  return (
    typeof details === "object" &&
    details !== null &&
    "message" in details &&
    Array.isArray((details as Record<string, unknown>).message) &&
    "error" in details &&
    "statusCode" in details
  );
}

// Type guard to check if details has a message property
function hasMessageInDetails(
  details: unknown,
): details is { message: string | string[] } {
  return (
    typeof details === "object" && details !== null && "message" in details
  );
}

export class ValidationError extends APIError {
  constructor(message: string, details?: ValidationErrorDetails) {
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
 * Extract error message from details with proper type checking
 */
function extractErrorMessage(details: unknown): string | undefined {
  if (!hasMessageInDetails(details)) {
    return undefined;
  }

  const { message } = details;

  if (Array.isArray(message)) {
    return message.length > 0 ? message[0] : undefined;
  }

  if (typeof message === "string") {
    return message;
  }

  return undefined;
}

/**
 * Error factory function to create appropriate error instances
 */
export function createAPIError(
  response: Response,
  message?: string,
  details?: APIErrorDetails | unknown,
): APIError {
  const status = response.status;
  const extractedMessage = extractErrorMessage(details);
  const defaultMessage =
    message || extractedMessage || `HTTP ${status}: ${response.statusText}`;

  switch (status) {
    case 400:
      return new ValidationError(
        defaultMessage,
        isValidationErrorDetails(details) ? details : undefined,
      );
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
