import z from "zod";
import { SCHEMA } from "@/lib/schemas/common";

export const carFilterSchema = z.object({
  brand: SCHEMA.string.optional,
  type: SCHEMA.string.optional,
  minPrice: SCHEMA.price.optional,
  maxPrice: SCHEMA.price.optional,
  model: SCHEMA.string.optional,
  subModel: SCHEMA.string.optional,
  color: SCHEMA.string.optional,
  transmission: SCHEMA.string.optional,
  modelYear: SCHEMA.string.optional,
  engineType: SCHEMA.string.optional,
  engineCapacity: SCHEMA.string.optional,
  minMileage: SCHEMA.string.optional,
  maxMileage: SCHEMA.string.optional,
});

export type CarFilterSchema = z.infer<typeof carFilterSchema>;
