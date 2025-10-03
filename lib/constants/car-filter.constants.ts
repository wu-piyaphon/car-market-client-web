import type { GetCarFiltersResponse } from "@/types/car-filter.types";
import type { CarFilterSchema } from "../schemas/car-filter-schema";

export const CAR_FILTER_DEFAULT_VALUES: CarFilterSchema = {
  brand: "",
  type: "",
  color: "",
  model: "",
  subModel: "",
  transmission: "",
  modelYear: "",
  engineType: "",
  engineCapacity: "",
  minMileage: "",
  maxMileage: "",
  maxPrice: "",
  minPrice: "",
};

export const CAR_FILTER_OPTIONS_FALLBACK: GetCarFiltersResponse = {
  brands: [],
  types: [],
  categories: [],
  models: [],
  subModels: [],
  transmissions: [],
  modelYears: [],
  engineTypes: [],
  colors: [],
  engineCapacities: [],
};
