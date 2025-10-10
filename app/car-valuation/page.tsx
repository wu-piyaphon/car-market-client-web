import type { Metadata } from "next";
import Container from "@/components/layout/container";
import CarValuationForm from "@/components/sections/car-valuation/car-valuation-form";
import { CONFIG } from "@/global-config";
import { getCarBrands } from "@/services/brand.services";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | แบบฟอร์มประเมินราคารถ`,
};

// ----------------------------------------------------------------------

export default async function Page() {
  const brandOptionsResult = await getCarBrands();

  if (!brandOptionsResult.success) {
    console.error("Failed to fetch brand options:", brandOptionsResult.error);
  }

  const brandOptions = brandOptionsResult.success
    ? brandOptionsResult.data
    : [];

  return (
    <Container className="h-full py-7 lg:py-8">
      <h1 className="font-bold text-5xl text-primary md:text-6xl md:text-slate-900 lg:text-9xl">
        ประเมินราคารถยนต์
      </h1>
      <h6 className="mt-1 hidden text-slate-400 md:block md:text-xl lg:text-3xl">
        โปรดกรอกข้อมูลรถที่ท่านต้องการประเมิน
      </h6>

      <CarValuationForm brandOptions={brandOptions} />
    </Container>
  );
}
