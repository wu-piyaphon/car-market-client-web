"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFRadioGroup from "@/components/hook-forms/rhf-radio";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/ui/form-states/form-success";
import {
  type CarSellingSchema,
  carSellingSchema,
} from "@/lib/schemas/car-selling-schema";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

const SELLING_TYPES_OPTIONS = [
  { id: "CONSIGNMENT", name: "ลงประกาศผ่านเว็บไซท์" },
  { id: "OWNER", name: "ขายรถกับเต๊นท์ GoodCarMarket" },
];

// ----------------------------------------------------------------------

export default function CarSellingForm() {
  const methods = useForm<CarSellingSchema>({
    resolver: zodResolver(carSellingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      phone: "",
      type: "CONSIGNMENT",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitted },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form methods={methods} className="h-full pt-5 lg:pt-7" onSubmit={onSubmit}>
      <div
        className={cn(
          "flex h-full flex-col gap-4 md:gap-5 lg:gap-6",
          isSubmitted && "hidden",
        )}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-5">
          <RHFTextField name="firstName" label="ชื่อจริง" required />
          <RHFTextField name="lastName" label="นามสกุล" required />
          <RHFTextField name="nickname" label="ชื่อเล่น" required />
          <RHFTextField name="phone" label="เบอร์โทรศัพท์" required isNumeric />
        </div>

        <div>
          <p className="font-normal text-slate-900 text-xl md:font-bold md:text-4xl lg:text-5xl">
            ท่านต้องการ :
          </p>
          <RHFRadioGroup name="type" options={SELLING_TYPES_OPTIONS} row />
        </div>

        <div className="flex flex-row justify-start gap-4 lg:gap-5">
          <Button
            size="lg"
            variant="outline"
            className="hidden min-w-[140px] md:inline-flex"
          >
            กลับสู่หน้าหลัก
          </Button>
          <Button size="lg" className="min-w-[140px] flex-1 md:flex-initial">
            ส่งแบบฟอร์ม
          </Button>
        </div>
      </div>

      <FormSuccess />
    </Form>
  );
}
