"use client";

import { useFormContext, useWatch } from "react-hook-form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import FieldPopover from "@/components/ui/custom-popover/field-popover";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";

// ----------------------------------------------------------------------

type CarFilterSidebarProps = {
  filterOptions: GetCarFiltersResponse;
};

// ----------------------------------------------------------------------

export default function CarFilterSidebar({
  filterOptions,
}: CarFilterSidebarProps) {
  const { control } = useFormContext<CarFilterSchema>();

  const [selectedModel] = useWatch({
    control,
    name: ["model"],
  });

  const {
    types,
    brands,
    models,
    subModels,
    colors,
    transmissions,
    engineTypes,
    modelYears,
  } = filterOptions;

  const autocompleteFields = [
    { name: "type", label: "ประเภท", options: types },
    { name: "brand", label: "ยี่ห้อ", options: brands },
    { name: "model", label: "รุ่น", options: models },
    { name: "subModel", label: "รุ่นย่อย", options: subModels },
    { name: "color", label: "สีรถ", options: colors },
    { name: "transmission", label: "ระบบเกียร์", options: transmissions },
    { name: "year", label: "ปีรถ", options: modelYears },
    { name: "engineType", label: "ประเภทเครื่องยนต์", options: engineTypes },
  ];

  return (
    <div className="flex h-fit w-[200px] flex-col overflow-hidden rounded-md shadow-md">
      <div className="bg-primary px-3 py-4 text-white">ตัวเลือกการค้นหา</div>
      {autocompleteFields.map((field) => (
        <RHFAutocomplete
          key={field.name}
          name={field.name}
          label={field.label}
          options={field.options}
          disabled={field.name === "subModel" && !selectedModel}
          PopoverContentProps={{ side: "right" }}
          InputProps={{ className: "rounded-none border-b-0" }}
        />
      ))}

      <FieldPopover
        label="เลขไมล์"
        PopoverContentProps={{ side: "right" }}
        InputProps={{ className: "rounded-none border-b-0" }}
      >
        <div className="flex flex-row items-center gap-2">
          <RHFTextField name="minMileage" label="เลขไมล์ต่ำสุด" />
          -
          <RHFTextField name="maxMileage" label="เลขไมล์สูงสุด" />
        </div>
      </FieldPopover>

      <FieldPopover
        label="ราคา"
        PopoverContentProps={{ side: "right" }}
        InputProps={{ className: "rounded-none" }}
      >
        <div className="flex flex-row items-center gap-2">
          <RHFTextField name="minPrice" label="ราคาต่ำสุด" className="flex-1" />
          -
          <RHFTextField name="maxPrice" label="ราคาสูงสุด" className="flex-1" />
        </div>
      </FieldPopover>
    </div>
  );
}
