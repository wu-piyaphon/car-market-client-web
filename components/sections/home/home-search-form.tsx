"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import { buildQueryString } from "@/lib/params";
import { paths } from "@/lib/paths";
import {
  type CarSearchSchema,
  carSearchSchema,
} from "@/lib/schemas/car-search-schema";
import type {
  CarFilterImageOption,
  CarFilterOption,
} from "@/types/common.types";

type HomeSearchFormProps = {
  brandOptions: CarFilterImageOption[];
  modelOptions: CarFilterOption[];
  typeOptions: CarFilterImageOption[];
};

export default function HomeSearchForm({
  brandOptions,
  modelOptions,
  typeOptions,
}: HomeSearchFormProps) {
  const router = useRouter();

  const methods = useForm<CarSearchSchema>({
    resolver: zodResolver(carSearchSchema),
    defaultValues: {
      brand: "",
      model: "",
      type: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    const url = buildQueryString(paths.cars.list, data);
    router.push(url);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="grid grid-rows-3 gap-3 lg:gap-5">
        <RHFAutocomplete name="brand" label="ยี่ห้อรถ" options={brandOptions} />
        <RHFAutocomplete name="model" label="รุ่นรถ" options={modelOptions} />
        <RHFAutocomplete name="type" label="ประเภท" options={typeOptions} />

        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          <RHFTextField name="minPrice" label="ราคาต่ำสุด" type="currency" />
          <RHFTextField name="maxPrice" label="ราคาสูงสุด" type="currency" />
        </div>

        <Button type="submit" size="lg">
          <Search />
          ค้นหา
        </Button>
      </div>
    </Form>
  );
}
