import type { CarCategory, CarType } from "@/types/car.types";

export function fCurrency(value: string | number) {
  if (value === 0) return "-";

  return new Intl.NumberFormat("th-TH").format(
    typeof value === "string" ? parseFloat(value) : value,
  );
}

export const fCapitalize = (value: string): string => {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const fThousandSeparator = (value: string): string => {
  const numericValue = value.replace(/,/g, "");

  if (!numericValue || numericValue === "") return "";

  // Check if there's a decimal point
  const parts = numericValue.split(".");
  if (parts.length === 2) {
    // Format the integer part with thousand separators
    const integerPart = Number(parts[0]).toLocaleString();
    // Preserve the decimal part as-is
    return `${integerPart}.${parts[1]}`;
  }
  if (numericValue.endsWith(".")) {
    // Preserve trailing decimal point
    return `${Number(parts[0]).toLocaleString()}.`;
  }

  // No decimal point, format normally
  return Number(numericValue).toLocaleString();
};

// ----------------------------------------------------------------------

export function fCarCategoryString(category: CarCategory) {
  switch (category) {
    case "NEW":
      return "รถเข้าใหม่";
    default:
      return category;
  }
}

export function fCarTypeString(type: CarType) {
  switch (type) {
    case "PICKUP":
      return "รถกระบะ";
    case "SUV":
      return "รถ SUV";
    case "SEDAN":
      return "รถเก๋ง";
    default:
      return type;
  }
}

// ----------------------------------------------------------------------

export const removeThousandSeparator = (value: string): string => {
  return value.replace(/,/g, "");
};
