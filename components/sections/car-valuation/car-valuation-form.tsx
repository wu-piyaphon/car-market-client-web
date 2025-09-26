"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFRadioGroup from "@/components/hook-forms/rhf-radio";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import RHFUpload from "@/components/hook-forms/rhf-upload";
import { Button } from "@/components/ui/button";
import {
  CAR_IMAGE_SLOTS,
  FINANCE_OPTIONS,
} from "@/lib/constants/car-valuation.constant";
import {
  type CarValuationSchema,
  carValuationSchema,
} from "@/lib/schemas/car-valuation-schema";

// ----------------------------------------------------------------------

const PLACEHOLDER_IMAGE_PATH = "/images/placeholder/car-valuation";

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

  const renderCarForm = (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลรถ
      </h6>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8">
        <RHFAutocomplete
          options={[]}
          name="brand"
          label="ยี่ห้อรถ"
          className="flex-2/5"
          required
        />
        <RHFTextField name="model" label="รุ่นรถ" className="flex-2/5" required />
        <RHFTextField
          name="year"
          label="ปีรถ"
          className="flex-1/5"
          isNumeric
          required
        />
      </div>
    </div>
  );

  const renderFinanceForm = (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลไฟแนนซ์
      </h6>
      <RHFRadioGroup
        name="hasInstallment"
        options={FINANCE_OPTIONS}
        className="mb-2"
        row
      />
      <RHFTextField
        isNumeric
        name="installmentsInMonth"
        label="รอบงวดที่ค้าง (เดือน)"
        className="md:max-w-[260px] lg:max-w-[300px]"
      />
    </div>
  );

  const renderContactForm = (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลผู้ติดต่อ
      </h6>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8">
        <RHFTextField name="firstName" label="ชื่อจริง" className="flex-1" />
        <RHFTextField
          name="phoneNumber"
          label="เบอร์โทรศัพท์"
          isNumeric
          className="flex-1"
        />
        <RHFTextField
          name="lineId"
          label="Line ID (ไม่จำเป็น)"
          className="flex-1"
        />
      </div>
    </div>
  );

  const renderUploadImageForm = (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
      {CAR_IMAGE_SLOTS.map((slot, index) => (
        <RHFUpload
          key={slot.id}
          name={`images.${index}`}
          label={slot.label}
          placeholderImage={
            slot.placeholderImage
              ? `${PLACEHOLDER_IMAGE_PATH}${slot.placeholderImage}`
              : undefined
          }
          required
        />
      ))}
    </div>
  );

  return (
    <Form methods={methods}>
      <div className="mt-7 flex flex-col gap-7 md:mt-8 md:gap-8 lg:mt-10 lg:gap-10">
        {renderUploadImageForm}

        {renderCarForm}
        <hr className="hidden border-dashed md:block" />
        {renderFinanceForm}
        <hr className="hidden border-dashed md:block" />
        {renderContactForm}
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
