"use client";

import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFSelect from "@/components/hook-forms/rhf-select";
import { CAR_BRANDS, CAR_MODELS, CAR_TYPES } from "../mocks/mock-car-options";

export default function HomeSearchForm() {
  const methods = useForm({ defaultValues: { brand: "" } });

  const brandOptions = CAR_BRANDS.map((brand) => ({
    id: brand.name,
    name: brand.name,
  }));

  const modelOptions = CAR_MODELS.map((model) => ({
    id: model.name,
    name: model.name,
  }));

  const typeOptions = CAR_TYPES.map((type) => ({
    id: type.name,
    name: type.name,
  }));

  return (
    <Form methods={methods}>
      <div className="grid grid-rows-3 gap-3 lg:gap-5">
        <RHFSelect name="brand" label="ยี่ห้อรถ" options={brandOptions} />
        <RHFSelect name="model" label="รุ่นรถ" options={modelOptions} />
        <RHFSelect name="type" label="ประเภท" options={typeOptions} />
      </div>
    </Form>
  );
}
