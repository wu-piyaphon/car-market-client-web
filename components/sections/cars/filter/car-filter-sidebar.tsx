"use client";

import { useFormContext, useWatch } from "react-hook-form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import CarSearchBar from "@/components/sections/cars/search/car-search-bar";
import FieldPopover from "@/components/ui/custom-popover/field-popover";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";

// ----------------------------------------------------------------------

type CarFilterSidebarProps = {
  filterOptions: GetCarFiltersResponse;
  onSearch: (key: string, value: string | string[]) => void;
};

// ----------------------------------------------------------------------

export default function CarFilterSidebar({
  filterOptions,
  onSearch,
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
    engineCapacities,
  } = filterOptions;

  const autocompleteFields = [
    { name: "type", label: "ประเภท", options: types },
    { name: "brand", label: "ยี่ห้อ", options: brands },
    { name: "model", label: "รุ่น", options: models },
    { name: "subModel", label: "รุ่นย่อย", options: subModels },
    { name: "color", label: "สีรถ", options: colors },
    { name: "transmission", label: "ระบบเกียร์", options: transmissions },
    { name: "modelYear", label: "ปีรถ", options: modelYears },
    { name: "engineType", label: "ประเภทเครื่องยนต์", options: engineTypes },
    {
      name: "engineCapacity",
      label: "ขนาดเครื่องยนต์",
      options: engineCapacities,
    },
  ];

  return (
    <div className="flex h-fit w-[220px] flex-col overflow-hidden rounded-md shadow-md">
      <div className="bg-primary px-3 py-4 text-white">ตัวเลือกการค้นหา</div>
      <CarSearchBar
        onSearch={onSearch}
        InputProps={{ className: "rounded-none border-b-0" }}
      />
      {autocompleteFields.map((field) => (
        <RHFAutocomplete
          key={field.name}
          name={field.name}
          label={field.label}
          options={field.options}
          disabled={field.name === "subModel" && !selectedModel}
          PopoverContentProps={{ side: "right" }}
          InputProps={{ className: "rounded-none border-b-0" }}
          onChange={(value) => onSearch(field.name, value)}
        />
      ))}

      <FieldPopover
        type="MILEAGE"
        label="เลขไมล์"
        PopoverContentProps={{ side: "right" }}
        InputProps={{ className: "rounded-none border-b-0" }}
      >
        <div className="flex flex-row items-center gap-2">
          <RHFTextField
            type="currency"
            name="minMileage"
            label="เลขไมล์ต่ำสุด"
            onChange={(val) => onSearch("minMileage", val as string)}
          />
          -
          <RHFTextField
            type="currency"
            name="maxMileage"
            label="เลขไมล์สูงสุด"
            onChange={(val) => onSearch("maxMileage", val as string)}
          />
        </div>
      </FieldPopover>

      <FieldPopover
        type="PRICE"
        label="ราคา"
        PopoverContentProps={{ side: "right" }}
        InputProps={{ className: "rounded-none" }}
      >
        <div className="flex flex-row items-center gap-2">
          <RHFTextField
            name="minPrice"
            type="currency"
            label="ราคาต่ำสุด"
            className="flex-1"
            onChange={(val) => onSearch("minPrice", val as string)}
          />
          -
          <RHFTextField
            name="maxPrice"
            type="currency"
            label="ราคาสูงสุด"
            className="flex-1"
            onChange={(val) => onSearch("maxPrice", val as string)}
          />
        </div>
      </FieldPopover>
    </div>
  );
}
