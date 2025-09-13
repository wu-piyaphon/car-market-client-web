"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import FieldPopover from "@/components/ui/custom-popover/field-popover";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "@/lib/schemas/cars-filter-schema";

export default function CarsFilter() {
  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: {
      brand: "",
      type: "",
      maxPrice: "",
      minPrice: "",
    },
  });

  const autocompleteFields = [
    { name: "type", label: "ประเภท", options: [] },
    { name: "brand", label: "ยี่ห้อ", options: [] },
    { name: "model", label: "รุ่น", options: [] },
    { name: "subModel", label: "รุ่นย่อย", options: [] },
    { name: "color", label: "สีรถ", options: [] },
    { name: "transmission", label: "ระบบเกียร์", options: [] },

    { name: "year", label: "ปีรถ", options: [] },
    { name: "engineType", label: "ประเภทเครื่องยนต์", options: [] },
    { name: "engineCapacity", label: "ขนาดเครื่องยนต์", options: [] },
  ];

  return (
    <Form methods={methods}>
      <div className="my-5 hidden w-[200px] flex-col overflow-hidden rounded-md shadow-md md:flex">
        <div className="bg-primary px-3 py-4 text-white">ตัวเลือกการค้นหา</div>
        {autocompleteFields.map((field) => (
          <RHFAutocomplete
            key={field.name}
            name={field.name}
            label={field.label}
            options={field.options}
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
    </Form>
  );
}
