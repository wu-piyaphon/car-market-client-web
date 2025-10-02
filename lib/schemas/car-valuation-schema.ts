import z from "zod";
import { SCHEMA } from "./common";

export const carValuationSchema = z
  .object({
    brand: SCHEMA.string.required,
    model: SCHEMA.string.required,
    modelYear: SCHEMA.numberString.required,
    hasInstallment: SCHEMA.string.optional,
    installmentsInMonth: SCHEMA.numberString.optional,
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
          data.installmentsInMonth !== undefined &&
          data.installmentsInMonth !== ""
        );
      }
      return true;
    },
    {
      message: "จำนวนงวดผ่อนจำเป็นต้องระบุเมื่อมีการผ่อนชำระ",
      path: ["installmentsInMonth"],
    },
  );

export type CarValuationSchema = z.infer<typeof carValuationSchema>;
