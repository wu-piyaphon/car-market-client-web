import Container from "@/components/layout/container";
import CarDetailCard from "@/components/sections/cars/detail/car-detail-card";
import CarDetailCarousel from "@/components/sections/cars/detail/car-detail-carousel";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";
import { CAR_DETAIL } from "@/mocks/mock-car";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  console.log("🚀 ~ Page ~ slug:", slug);

  return (
    <Container className="space-y-16 md:mt-12">
      <div className="flex flex-row justify-between gap-4">
        <CarDetailCarousel images={CAR_DETAIL.images} />

        <CarDetailCard data={CAR_DETAIL} />
      </div>

      <div className="hidden md:flex">
        <LoanCalculatorForm />
      </div>
    </Container>
  );
}
