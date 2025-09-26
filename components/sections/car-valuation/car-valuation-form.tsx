"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import { Button } from "@/components/ui/button";
import {
  type CarValuationSchema,
  carValuationSchema,
} from "@/lib/schemas/car-valuation-schema";
import ValuationCarForm from "./valuation-form/valuation-car-form";
import ValuationContactForm from "./valuation-form/valuation-contact-form";
import ValuationFinanceForm from "./valuation-form/valuation-finance-form";
import ValuationImageForm from "./valuation-form/valuation-image-form";

// ----------------------------------------------------------------------

export default function CarValuationForm() {
  const methods = useForm<CarValuationSchema>({
    resolver: zodResolver(carValuationSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      hasInstallment: "true",
      installmentsInMonth: "",
      firstName: "",
      phoneNumber: "",
      lineId: "",
      images: new Array(12).fill(undefined),
    },
  });

  const { handleSubmit } = methods;

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods}>
      <div className="mt-7 flex flex-col gap-7 md:mt-8 md:gap-8 lg:mt-10 lg:gap-10">
        <ValuationImageForm />

        <ValuationCarForm />
        <hr className="hidden border-dashed md:block" />
        <ValuationFinanceForm />
        <hr className="hidden border-dashed md:block" />
        <ValuationContactForm />
      </div>

      <div className="mt-5 flex flex-col md:mt-10 md:flex-row md:gap-4 lg:mt-15 lg:gap-5">
        <Button size="lg" variant="outline" className="hidden md:flex" asChild>
          <Link href="/">กลับสู่หน้าหลัก</Link>
        </Button>
        <Button type="submit" size="lg" onClick={onSubmit}>
          ส่งประเมินราคา
        </Button>
      </div>
    </Form>
  );
}
