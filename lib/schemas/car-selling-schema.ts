import z from "zod";
import type { SalesType } from "@/types/car.types";
import { SCHEMA } from "./common";

export const carSellingSchema = z.object({
  firstName: SCHEMA.string.required,
  lastName: SCHEMA.string.required,
  nickname: SCHEMA.string.required,
  phone: SCHEMA.numberString.required,
  type: z.custom<SalesType>(),
});

export type CarSellingSchema = z.infer<typeof carSellingSchema>;
