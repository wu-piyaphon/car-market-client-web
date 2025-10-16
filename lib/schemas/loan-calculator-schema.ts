import z from "zod";
import { SCHEMA } from "./common";

export const loanCalculatorSchema = z.object({
  price: SCHEMA.numberString.required,
  interest: SCHEMA.numberString.required,
  loanTerm: SCHEMA.numberString.required,
  downPayment: SCHEMA.numberString.required,
  totalPriceWithVAT: SCHEMA.string.optional,
  totalInterestWithVAT: SCHEMA.string.optional,
  monthlyInterestWithVAT: SCHEMA.string.optional,
});

export type LoanCalculatorSchema = z.infer<typeof loanCalculatorSchema>;
