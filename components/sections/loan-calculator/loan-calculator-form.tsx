"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import { fCurrency } from "@/lib/format-string";
import {
  type LoanCalculatorSchema,
  loanCalculatorSchema,
} from "@/lib/schemas/loan-calculator-schema";
import LoanCalculatorResult from "./loan-calculator-result";

type LoanCalculatorFormProps = {
  defaultPrice?: number;
};

export default function LoanCalculatorForm({
  defaultPrice,
}: LoanCalculatorFormProps) {
  const methods = useForm<LoanCalculatorSchema>({
    resolver: zodResolver(loanCalculatorSchema),
    defaultValues: {
      price: defaultPrice ? defaultPrice.toString() : "",
      interest: "",
      loanTerm: "",
      downPayment: "",
      totalPriceWithVAT: undefined,
      totalInterestWithVAT: undefined,
      monthlyInterestWithVAT: undefined,
    },
  });

  const { handleSubmit, setValue } = methods;

  const calculate = handleSubmit((data: LoanCalculatorSchema) => {
    const { price, interest, downPayment, loanTerm } = data;

    const loanTermInMonths = Number(loanTerm) * 12;

    const totalFinance = Number(price) - Number(downPayment);
    const totalInterest =
      totalFinance * (Number(interest) / 100) * Number(loanTerm);

    const total = totalFinance + totalInterest;

    const totalPriceWithVAT = total * 1.07;
    const totalInterestWithVAT = totalInterest * 1.07;
    const monthlyInterestWithVAT = totalPriceWithVAT / loanTermInMonths;

    setValue("totalPriceWithVAT", fCurrency(totalPriceWithVAT));
    setValue("totalInterestWithVAT", fCurrency(totalInterestWithVAT));
    setValue("monthlyInterestWithVAT", fCurrency(monthlyInterestWithVAT));
  });

  // ----------------------------------------------------------------------

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
          ช่วยให้คุณวางแผนการผ่อนได้ง่ายๆ รู้ค่างวดล่วงหน้าเบื้องต้นได้เลย ผลการพิจารณา
          เป็นเพียงข้อมูลการคำนวณเบื้องต้น ในการอนุมัติของธนาคาร ข้อมูลการผ่อนชำระ
          จำนวนเงินผ่อนชำระ วงเงินที่ได้รับอนุมัติ อาจมีการเปลี่ยนแปลงได้ตามเงื่อนไขที่ธนาคารกำหนด
        </p>

        <div className="mt-5 flex flex-col gap-5 md:mt-8 md:gap-6 lg:gap-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <RHFTextField
              name="price"
              label="ราคารถ (บาท)"
              type="currency"
              disabled={!!defaultPrice}
            />
            <RHFTextField name="interest" label="ดอกเบี้ย (%)" type="currency" />
            <RHFTextField
              name="loanTerm"
              label="ระยะเวลาสินเชื่อ (ปี)"
              type="number"
            />
            <RHFTextField
              name="downPayment"
              label="เงินดาวน์ (บาท)"
              type="currency"
            />
          </div>

          <Button type="button" size="lg" onClick={calculate}>
            Calculate
          </Button>
        </div>
      </article>

      <LoanCalculatorResult />
    </Form>
  );
}
