"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import { loanCalculatorSchema } from "@/lib/schemas/loan-calculator-schema";
import LoanCalculatorResult from "./loan-calculator-result";

export default function LoanCalculatorForm() {
  const methods = useForm({
    resolver: zodResolver(loanCalculatorSchema),
    defaultValues: {
      price: "",
      interest: "",
      loanTerm: "",
      downPayment: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <Form
      methods={methods}
      className="flex w-full flex-col rounded-2xl md:flex-row md:shadow-lg"
    >
      <article className="mb-8 flex flex-col rounded-l-2xl bg-white p-5 pb-0 md:mb-0 md:p-10 lg:p-14">
        <h2 className="font-bold text-5xl text-primary md:mb-3 md:text-6xl lg:text-11xl">
          คำณวนสินเชื่อ
        </h2>
        <p className="hidden text-base md:block lg:text-xl">
          Use our loan calculator to calculate payments over the life of your
          loan. Enter your information to see how much your monthly payments
          could be. You can adjust length of loan, down payment and interest
          rate to see how those changes raise or lower your payments.
        </p>

        <div className="mt-5 flex flex-col gap-5 md:mt-8 md:gap-6 lg:gap-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <RHFTextField name="price" label="ราคารถ (บาท)" isNumeric />
            <RHFTextField name="interest" label="ดอกเบี้ย (%)" isNumeric />
            <RHFTextField name="loanTerm" label="ระยะเวลาสินเชื่อ (ปี)" isNumeric />
            <RHFTextField name="downPayment" label="เงินดาวน์ (บาท)" isNumeric />
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleSubmit((data) => console.log(data))}
          >
            Calculate
          </Button>
        </div>
      </article>

      <LoanCalculatorResult />
    </Form>
  );
}
