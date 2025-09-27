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
    <Container className="py-6 md:py-12">
      <section className="mb-12 md:mb-16" aria-labelledby="car-details">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,_1fr)_350px] lg:grid-cols-[minmax(0,_1fr)_400px] lg:gap-8">
          <CarDetailCarousel images={CAR_DETAIL.images} />

          <CarDetailCard data={CAR_DETAIL} />
        </div>
      </section>

      <LoanCalculatorForm />
    </Container>
  );
}
