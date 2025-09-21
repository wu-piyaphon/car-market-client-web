"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFRadioGroup from "@/components/hook-forms/rhf-radio";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";

const FINANCE_OPTIONS = [
  { name: "ติดไฟแนนซ์", id: "true" },
  { name: "ผ่อนชำระครบแล้ว", id: "false" },
];

export default function CarValuationForm() {
  const methods = useForm({
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      hasInstallment: "true",
      installmentsInMonth: "",
      firstName: "",
      phoneNumber: "",
      lineId: "",
    },
  });

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
        />
        <RHFTextField name="model" label="รุ่นรถ" className="flex-2/5" />
        <RHFTextField name="year" label="ปีรถ" className="flex-1/5" />
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

  return (
    <Form methods={methods}>
      <div className="mt-7 flex flex-col gap-7 md:mt-8 md:gap-8 lg:mt-10 lg:gap-10">
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
        <Button size="lg">ส่งประเมินราคา</Button>
      </div>
    </Form>
  );
}
