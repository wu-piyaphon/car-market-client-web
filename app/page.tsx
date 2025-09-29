import { Suspense } from "react";
import Container from "@/components/layout/container";
import HomeAboutUs from "@/components/sections/home/home-about-us";
import HomeCarsContent from "@/components/sections/home/home-cars-section/home-cars-content";
import HomeCarsLoading from "@/components/sections/home/home-cars-section/home-cars-loading";
import HomeSearchCard from "@/components/sections/home/home-search-card";
import HomeSellingSection from "@/components/sections/home/home-selling-section";
import type { CarCardGroup } from "@/components/sections/shared/car-card-list";
import CarImageBanner from "@/components/ui/custom-banner/car-image-banner";
import { fCarCategoryString, fCarTypeString } from "@/lib/format-string";
import { getCars } from "@/services";
import type { CarCategory, CarType } from "@/types/car.types";

// ----------------------------------------------------------------------

const CATEGORIES: CarCategory[] = ["NEW"];
const CAR_TYPES: CarType[] = ["PICKUP", "SEDAN", "SUV"];

// ----------------------------------------------------------------------

async function fetchHomePageCarData(): Promise<CarCardGroup[]> {
  const [categoryResults, typeResults] = await Promise.all([
    Promise.all(
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
    ),
    Promise.all(
      CAR_TYPES.map(async (type) => {
        const result = await getCars(
          { type, page: 1, pageSize: 4 },
          { next: { revalidate: 300 } }, // 5 minutes cache
        );
        return {
          title: fCarTypeString(type),
          list: result.data?.items || [],
        };
      }),
    ),
  ]);

  return [...categoryResults, ...typeResults];
}

export default async function Home() {
  const carsPromise = fetchHomePageCarData();

  return (
    <>
      <Container className="block md:hidden">
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">"GoodCarMarket"</span>
        </h1>
      </Container>

      <CarImageBanner />

      <HomeSearchCard />

      <Suspense fallback={<HomeCarsLoading />}>
        <HomeCarsContent carsPromise={carsPromise} />
      </Suspense>

      <HomeSellingSection />

      <HomeAboutUs />
    </>
  );
}
