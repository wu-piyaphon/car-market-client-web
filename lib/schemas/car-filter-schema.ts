import z from "zod";
import { SCHEMA } from "@/lib/schemas/common";
import type { CarType, EngineType, Transmission } from "@/types/car.types";

export const carFilterSchema = z.object({
  category: SCHEMA.string.optional,
  brand: SCHEMA.string.optional,
  type: z.custom<CarType | "">().optional(),
  minPrice: SCHEMA.numberString.optional,
  maxPrice: SCHEMA.numberString.optional,
  model: SCHEMA.string.optional,
  subModel: SCHEMA.string.optional,
  color: SCHEMA.string.optional,
  transmission: z.custom<Transmission | "">().optional(),
  modelYear: SCHEMA.numberString.optional,
  engineType: z.custom<EngineType | "">().optional(),
  engineCapacity: SCHEMA.numberString.optional,
  minMileage: SCHEMA.numberString.optional,
  maxMileage: SCHEMA.numberString.optional,
  isActive: SCHEMA.boolean.optional,
});

export type CarFilterSchema = z.infer<typeof carFilterSchema>;
