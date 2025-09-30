import z from "zod";
import { SCHEMA } from "./common";

export const carSearchSchema = z.object({
  brand: SCHEMA.string.optional,
  model: SCHEMA.string.optional,
  type: SCHEMA.string.optional,
  minPrice: SCHEMA.numberString.optional,
  maxPrice: SCHEMA.numberString.optional,
});

export type CarSearchSchema = z.infer<typeof carSearchSchema>;
