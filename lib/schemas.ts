import z from "zod";

export const homeSearchSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  type: z.string().optional(),
  minPrice: z
    .string()
    .regex(/^\d+$/, "ต้องเป็นตัวเลข")
    .optional()
    .or(z.literal("")),
  maxPrice: z
    .string()
    .regex(/^\d+$/, "ต้องเป็นตัวเลข")
    .optional()
    .or(z.literal("")),
});

export type HomeSearchSchema = z.infer<typeof homeSearchSchema>;
