import { Suspense } from "react";
import Container from "@/components/layout/container";
import CarSellingCarsContent from "@/components/sections/car-selling/car-selling-cars-section/car-selling-cars-content";
import CarSellingCarsLoading from "@/components/sections/car-selling/car-selling-cars-section/car-selling-cars-loading";
import CarSellingForm from "@/components/sections/car-selling/car-selling-form";
import type { CarCardGroup } from "@/components/ui/custom-card/car-card-list";
import { fCarCategoryString } from "@/lib/format-string";
import { getCars } from "@/services";
import type { CarCategory } from "@/types/car.types";

async function fetchCarSellingPageData(): Promise<CarCardGroup[]> {
  const CATEGORIES: CarCategory[] = ["NEW"];

  const results = await Promise.all(
    CATEGORIES.map(async (category) => {
      const result = await getCars(
        { category, page: 1, pageSize: 4 },
        { next: { revalidate: 300 } }, // 5 minutes cache
      );
      return {
        title: fCarCategoryString(category),
        list: result.data?.items || [],
      };
    }),
  );

  return results;
}

export default function Page() {
  const carsPromise = fetchCarSellingPageData();

  return (
    <Container className="h-full py-7 lg:py-8">
      <div className="h-full md:h-fit">
        <h1 className="font-bold text-5xl text-primary md:text-6xl md:text-slate-900 lg:text-9xl">
          ลงประกาศ/ขายรถ
        </h1>
        <h6 className="mt-1 hidden text-slate-400 md:block md:text-xl lg:text-3xl">
          กรุณากรอกขอมูลการลงประกาศ/ขายรถ
        </h6>

        <CarSellingForm />
      </div>

      <div className="mt-12 hidden md:block lg:mt-16">
        <Suspense fallback={<CarSellingCarsLoading />}>
          <CarSellingCarsContent
            carsPromise={carsPromise}
            className="grid grid-cols-4"
          />
        </Suspense>
      </div>
    </Container>
  );
}
