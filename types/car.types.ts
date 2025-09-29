export type CarType = "PICKUP" | "SEDAN" | "SUV";
export type CarCategory = "NEW";
export type SalesType = "CONSIGNMENT" | "OWNER";
export type Transmission = "AUTOMATIC" | "MANUAL";
export type EngineType =
  | "GASOLINE"
  | "DIESEL"
  | "ELECTRIC"
  | "HYBRID"
  | "LPG"
  | "CNG";

export type CarListItem = {
  id: string;
  brand: string;
  type: string;
  transmission: string;
  category: string | null;
  thumbnail: string;
  model: string;
  subModel: string;
  modelYear: number;
  price: number;
  previousLicensePlate: string | null;
  newLicensePlate: string;
  isActive: boolean;
  slug: string;
};

export type CarDetail = {
  id: string;
  slug: string;
  model: string;
  subModel: string;
  modelYear: number;
  transmission: string;
  color: string;
  engineType: string;
  engineCapacity: number;
  mileage: number | null;
  price: number;
  images: string[];
  previousLicensePlate: string | null;
  newLicensePlate: string;
  isActive: boolean;
  salesType: SalesType;
  createdAt: string;
  updatedAt: string;
  brand: {
    id: string;
    image: string;
    name: string;
  };
  type: {
    id: string;
    image: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  } | null;
};

// ----------------------------------------------------------------------
// API Request & Response Types

export type GetCarsQueryParams = {
  page: number;
  pageSize: number;
  keyword?: string;
  type?: CarType;
  brand?: string;
  category?: string;
  transmission?: Transmission;
  model?: string;
  subModel?: string;
  color?: string;
  modelYear?: number;
  engineType?: EngineType;
  engineCapacity?: number;
  minMileage?: number;
  maxMileage?: number;
  minPrice?: number;
  maxPrice?: number;
  salesType?: SalesType;
  isActive?: boolean;
};

export type GetCarsResponse = {
  items: CarListItem[];
  total: number;
  page: number;
  pageSize: number;
};
