import { useFormContext, useWatch } from "react-hook-form";
import type { LoanCalculatorSchema } from "@/lib/schemas/loan-calculator-schema";

export default function LoanCalculatorResult() {
  const { control } = useFormContext<LoanCalculatorSchema>();

  const [monthlyInterestWithVAT] = useWatch({
    control,
    name: ["monthlyInterestWithVAT"],
  });

  const result = [
    { label: "จ่ายต่อเดือน (Baht)", value: monthlyInterestWithVAT || "0" },
    // { label: "ดอกเบี้ยทั้งหมด (Baht)", value: totalInterestWithVAT || "0" },
    // { label: "รวมเป็นเงิน (Baht)", value: totalPriceWithVAT || "0" },
  ];

  return (
    <article className="flex w-full flex-col justify-center rounded-r-2xl bg-transparent md:bg-primary-100 md:pl-8 lg:gap-11 lg:pl-11">
      <h2 className="mb-4 pl-5 font-bold text-5xl text-primary md:hidden">
        ผลการคำณวน
      </h2>

      <div className="flex flex-col gap-5 bg-primary-100 p-10 md:gap-6 md:bg-transparent md:p-0">
        {result.map((item) => (
          <div className="flex flex-col" key={item.label}>
            <h3 className="font-bold text-lg lg:text-2xl">{item.label}</h3>
            <p className="text-primary text-xl">฿{item.value}</p>
          </div>
        ))}
        <h6 className="text-lg lg:text-xl">
          *การคำนวณนี้รวมภาษีมูลค่าเพิ่ม (VAT) 7% แล้ว
        </h6>
      </div>
    </article>
  );
}
