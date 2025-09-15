import z from "zod";
import { SCHEMA } from "./common";

export const loanCalculatorSchema = z.object({
  price: SCHEMA.numberString.required,
  interest: SCHEMA.numberString.required,
  loanTerm: SCHEMA.numberString.required,
  downPayment: SCHEMA.numberString.required,
});

export type LoanCalculatorSchema = z.infer<typeof loanCalculatorSchema>;
