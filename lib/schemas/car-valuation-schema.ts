import z from "zod";
import { SCHEMA } from "./common";

export const carValuationSchema = z.object({
  brand: SCHEMA.string.required,
  model: SCHEMA.string.required,
  year: SCHEMA.numberString.required,
  hasInstallment: SCHEMA.string.optional,
  installmentsInMonth: SCHEMA.numberString.optional,
  firstName: SCHEMA.string.required,
  phoneNumber: SCHEMA.numberString.required,
  lineId: SCHEMA.string.optional,
  images: z.array(z.instanceof(File)).length(12, {
    message: "โปรดอัปโหลดรูปภาพให้ครบ 12 รูป",
  }),
});

export type CarValuationSchema = z.infer<typeof carValuationSchema>;
