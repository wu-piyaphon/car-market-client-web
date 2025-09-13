import z from "zod";
import { SCHEMA } from "./common";

export const carSearchSchema = z.object({
  brand: SCHEMA.string.optional,
  model: SCHEMA.string.optional,
  type: SCHEMA.string.optional,
  minPrice: SCHEMA.price.optional,
  maxPrice: SCHEMA.price.optional,
});

export type CarSearchSchema = z.infer<typeof carSearchSchema>;
