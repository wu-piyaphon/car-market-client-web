import type { Metadata } from "next";
import Container from "@/components/layout/container";
import CarDetailCard from "@/components/sections/cars/detail/car-detail-card";
import CarDetailCarousel from "@/components/sections/cars/detail/car-detail-carousel";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";
import { CONFIG } from "@/global-config";
import { getCarBySlug } from "@/services";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | รายละเอียดรถยนต์`,
};

// ----------------------------------------------------------------------

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const detail = await getCarBySlug(slug);

  if (!detail.success) {
    console.error("Failed to fetch car details:", detail.error);
    return <div>Failed to load car details.</div>;
  }

  return (
    <section aria-labelledby="car-details">
      <Container className="px-0 md:block md:px-10 md:py-12 lg:px-15">
        <div className="mb-6 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-[minmax(0,_1fr)_350px] lg:grid-cols-[minmax(0,_1fr)_400px] lg:gap-8">
          <CarDetailCarousel images={detail.data.images} />

          <CarDetailCard data={detail.data} />
        </div>

        <div className="hidden md:block">
          <LoanCalculatorForm />
        </div>
      </Container>

      <div className="block md:hidden">
        <LoanCalculatorForm />
      </div>
    </section>
  );
}
