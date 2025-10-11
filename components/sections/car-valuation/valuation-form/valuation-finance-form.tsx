import { useFormContext, useWatch } from "react-hook-form";
import RHFRadioGroup from "@/components/hook-forms/rhf-radio";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { FINANCE_OPTIONS } from "@/lib/constants/car-valuation.constants";
import type { CarValuationSchema } from "@/lib/schemas/car-valuation-schema";

export default function ValuationFinanceForm() {
  const { control } = useFormContext<CarValuationSchema>();

  const hasInstallment = useWatch({
    control,
    name: "hasInstallment",
  });

  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลไฟแนนซ์
      </h6>
      <RHFRadioGroup
        name="hasInstallment"
        options={FINANCE_OPTIONS}
        className="mb-2"
        row
      />
      {hasInstallment === "true" && (
        <RHFTextField
          type="number"
          name="installmentsInMonth"
          label="รอบงวดที่ค้าง (บาท)"
          className="md:max-w-[260px] lg:max-w-[300px]"
        />
      )}
    </div>
  );
}
