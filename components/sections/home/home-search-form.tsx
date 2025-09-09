"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import { type HomeSearchSchema, homeSearchSchema } from "@/lib/schemas";
import {
  CAR_BRANDS,
  CAR_MODELS,
  CAR_TYPES,
} from "../../../mocks/mock-car-options";

export default function HomeSearchForm() {
  const methods = useForm<HomeSearchSchema>({
    resolver: zodResolver(homeSearchSchema),
    defaultValues: {
      brand: "",
      model: "",
      type: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  const { handleSubmit } = methods;

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

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="grid grid-rows-3 gap-3 lg:gap-5">
        <RHFAutocomplete name="brand" label="ยี่ห้อรถ" options={brandOptions} />
        <RHFAutocomplete name="model" label="รุ่นรถ" options={modelOptions} />
        <RHFAutocomplete name="type" label="ประเภท" options={typeOptions} />

        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          <RHFTextField name="minPrice" label="ราคาต่ำสุด" />
          <RHFTextField name="maxPrice" label="ราคาสูงสุด" />
        </div>

        <Button size="lg">
          <Search />
          ค้นหา
        </Button>
      </div>
    </Form>
  );
}
