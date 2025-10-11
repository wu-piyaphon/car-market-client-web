import RHFTextField from "@/components/hook-forms/rhf-textfield";

export default function ValuationContactForm() {
  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      <h6 className="font-bold text-slate-900 text-xl md:text-4xl lg:text-5xl">
        ข้อมูลผู้ติดต่อ
      </h6>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8">
        <RHFTextField name="firstName" label="ชื่อผู้ติดต่อ" className="flex-1" />
        <RHFTextField
          type="number"
          name="phoneNumber"
          label="เบอร์โทรศัพท์"
          className="flex-1"
        />
        <RHFTextField name="lineId" label="Line ID" className="flex-1" />
      </div>
    </div>
  );
}
