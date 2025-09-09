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
