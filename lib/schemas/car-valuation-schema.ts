import z from "zod";
import { SCHEMA } from "./common";

export const carValuationSchema = z
  .object({
    brand: SCHEMA.string.required,
    model: SCHEMA.string.required,
    modelYear: SCHEMA.numberString.required,
    hasInstallment: SCHEMA.string.optional,
    remainingInstallmentAmount: SCHEMA.numberString.optional,
    firstName: SCHEMA.string.required,
    phoneNumber: SCHEMA.numberString.required,
    lineId: SCHEMA.string.optional,
    files: z.array(z.instanceof(File)).length(12, {
      message: "โปรดอัปโหลดรูปภาพให้ครบ 12 รูป",
    }),
  })
  .refine(
    (data) => {
      if (data.hasInstallment === "true") {
        return (
          data.remainingInstallmentAmount !== undefined &&
          data.remainingInstallmentAmount !== ""
        );
      }
      return true;
    },
    {
      message: "จำเป็นต้องระบุค่าค้างชำระเมื่อติดไฟแนนซ์",
      path: ["remainingInstallmentAmount"],
    },
  );

export type CarValuationSchema = z.infer<typeof carValuationSchema>;
