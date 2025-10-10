import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import type { BrandOption } from "@/types/brand.types";

// ----------------------------------------------------------------------

type ValuationCarFormProps = {
  brandOptions: BrandOption[];
};

// ----------------------------------------------------------------------

export default function ValuationCarForm({
  brandOptions,
}: ValuationCarFormProps) {
  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลรถ
      </h6>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8">
        <RHFAutocomplete
          options={brandOptions}
          name="brand"
          label="ยี่ห้อรถ"
          className="flex-2/5"
          required
        />
        <RHFTextField name="model" label="รุ่นรถ" className="flex-2/5" required />
        <RHFTextField
          type="number"
          name="modelYear"
          label="ปีรถ"
          className="flex-1/5"
          required
        />
      </div>
    </div>
  );
}
