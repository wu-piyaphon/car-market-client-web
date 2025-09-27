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

export type CarSellingType = "CONSIGNMENT" | "OWNER";

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
  salesType: CarSellingType;
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
