import z from "zod";

export const SCHEMA = {
  string: {
    required: z.string().min(1, "กรุณากรอกข้อมูล"),
    optional: z.string().optional(),
  },
  numberString: {
    required: z.string().regex(/^\d+(\.\d+)?$/, "ต้องเป็นตัวเลข"),
    optional: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "ต้องเป็นตัวเลข")
      .optional()
      .or(z.literal("")),
  },
  number: {
    required: z.number().min(0, "ต้องเป็นตัวเลขที่มากกว่า 0"),
    optional: z.number().optional(),
  },
  boolean: {
    required: z.boolean().refine((val) => val === true),
    optional: z.boolean().optional(),
  },
};
