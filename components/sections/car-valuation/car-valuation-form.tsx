"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/ui/form-states/form-success";
import {
  type CarValuationSchema,
  carValuationSchema,
} from "@/lib/schemas/car-valuation-schema";
import { cn } from "@/lib/utils";
import { submitCarValuationForm } from "@/services/actions/car-valuation.actions";
import type { BrandOption } from "@/types/brand.types";
import ValuationCarForm from "./valuation-form/valuation-car-form";
import ValuationContactForm from "./valuation-form/valuation-contact-form";
import ValuationFinanceForm from "./valuation-form/valuation-finance-form";
import ValuationImageForm from "./valuation-form/valuation-image-form";

// ----------------------------------------------------------------------

type CarValuationFormProps = {
  brandOptions: BrandOption[];
};

// ----------------------------------------------------------------------

export default function CarValuationForm({
  brandOptions,
}: CarValuationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<CarValuationSchema>({
    resolver: zodResolver(carValuationSchema),
    defaultValues: {
      brand: "",
      model: "",
      modelYear: "",
      hasInstallment: "true",
      installmentsInMonth: "",
      firstName: "",
      phoneNumber: "",
      lineId: "",
      files: new Array(12).fill(undefined),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "files" && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append("files", file);
            }
          });
        } else if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const res = await submitCarValuationForm(formData);

      if (!res.success) {
        throw new Error(res.error || "Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  });

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods} onSubmit={onSubmit} className="h-full">
      <div className={cn(isSubmitted && "hidden")}>
        <div className="mt-7 flex flex-col gap-7 md:mt-8 md:gap-8 lg:mt-10 lg:gap-10">
          <ValuationImageForm />

          <ValuationCarForm brandOptions={brandOptions} />
          <hr className="hidden border-dashed md:block" />
          <ValuationFinanceForm />
          <hr className="hidden border-dashed md:block" />
          <ValuationContactForm />
        </div>

        <div className="mt-5 flex flex-col md:mt-10 md:flex-row md:gap-4 lg:mt-15 lg:gap-5">
          <Button
            size="lg"
            variant="outline"
            className="hidden md:flex"
            asChild
          >
            <Link href="/">กลับสู่หน้าหลัก</Link>
          </Button>
          <Button
            size="lg"
            className="flex-1 shrink-0 md:w-[140px] md:flex-initial lg:w-[175px]"
            loading={isSubmitting}
          >
            ส่งประเมินราคา
          </Button>
        </div>
      </div>

      <FormSuccess isSubmitted={isSubmitted} />
    </Form>
  );
}
