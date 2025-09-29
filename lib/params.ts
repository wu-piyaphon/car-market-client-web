/**
 * Builds URLSearchParams from an object, filtering out undefined, null, and empty values
 * @param params - Object containing query parameters
 * @returns URLSearchParams instance ready for use in URLs
 */
export function buildSearchParams(
  params: Record<string, string | number | boolean | undefined>,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams;
}

/**
 * Builds a query string from an object
 * @param params - Object containing query parameters
 * @returns Query string (without the leading '?')
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined>,
): string {
  return buildSearchParams(params).toString();
}

/**
 * Parses URLSearchParams or query string into an object
 * @param searchParams - URLSearchParams instance or query string
 * @returns Object with parsed parameters
 */
export function parseSearchParams(
  searchParams: URLSearchParams | string,
): Record<string, string> {
  const params =
    typeof searchParams === "string"
      ? new URLSearchParams(searchParams)
      : searchParams;

  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Merges multiple parameter objects and builds URLSearchParams
 * @param paramObjects - Multiple parameter objects to merge
 * @returns URLSearchParams instance with merged parameters
 */
export function mergeSearchParams(
  ...paramObjects: Array<Record<string, string | number | boolean | undefined>>
): URLSearchParams {
  const merged = Object.assign({}, ...paramObjects);
  return buildSearchParams(merged);
}
