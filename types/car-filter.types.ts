import type { Transmission } from "./car.types";
import type { CarFilterImageOption, CarFilterOption } from "./common.types";

export type GetCarFiltersQueryParams = {
  type?: string;
  brand?: string;
  category?: string;
  model?: string;
  subModel?: string;
  transmission?: Transmission;
  modelYear?: number;
  engineType?: string;
  color?: string;
};

export type GetCarFiltersResponse = {
  brands: CarFilterImageOption[];
  types: CarFilterImageOption[];
  categories: CarFilterOption[];
  models: CarFilterOption[];
  subModels: CarFilterOption[];
  transmissions: CarFilterOption[];
  modelYears: CarFilterOption[];
  engineTypes: CarFilterOption[];
  engineCapacities: CarFilterOption[];
  colors: CarFilterOption[];
};
