import type { CarCategory, CarType } from "@/types/car.types";

export function fCurrency(value: string | number) {
  return new Intl.NumberFormat("th-TH").format(
    typeof value === "string" ? parseFloat(value) : value,
  );
}

export function fCarCategoryString(category: CarCategory) {
  switch (category) {
    case "NEW":
      return "รถใหม่";
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
