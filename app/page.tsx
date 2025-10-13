import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/container";
import HomeAboutUs from "@/components/sections/home/home-about-us";
import HomeCarsContent from "@/components/sections/home/home-cars-section/home-cars-content";
import HomeCarsLoading from "@/components/sections/home/home-cars-section/home-cars-loading";
import HomeSearchCard from "@/components/sections/home/home-search-card";
import HomeSellingSection from "@/components/sections/home/home-selling-section";
import CarImageBanner from "@/components/ui/custom-banner/car-image-banner";
import type { CarCardGroup } from "@/components/ui/custom-card/car-card-list";
import { CONFIG } from "@/global-config";
import { fCarCategoryString, fCarTypeString } from "@/lib/format-string";
import { getCars } from "@/services";
import type { CarCategory, CarType } from "@/types/car.types";

// ----------------------------------------------------------------------

const CATEGORIES: CarCategory[] = ["NEW"];
const CAR_TYPES: CarType[] = ["PICKUP", "SEDAN", "SUV"];

export const metadata: Metadata = {
  title: `${CONFIG.appName} | ตลาดรถยนต์ออนไลน์ประเทศไทย`,
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// ----------------------------------------------------------------------

async function fetchHomePageCarData(): Promise<CarCardGroup[]> {
  const [categoryResults, typeResults] = await Promise.all([
    Promise.all(
      CATEGORIES.map(async (category) => {
        const result = await getCars(
          { category, page: 1, pageSize: 4 },
          { next: { revalidate: 60 } }, // 1 minute cache
        );
        if (!result.success) {
          console.error(
            `Failed to fetch cars for category ${category}:`,
            result.error,
          );
          return { title: fCarCategoryString(category), list: [] };
        }

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
          { next: { revalidate: 60 } }, // 1 minute cache
        );
        if (!result.success) {
          console.error(`Failed to fetch cars for type ${type}:`, result.error);
          return { title: fCarTypeString(type), list: [] };
        }

        return {
          title: fCarTypeString(type),
          list: result.data?.items || [],
        };
      }),
    ),
  ]);

  return [...categoryResults, ...typeResults];
}

export default async function Home({ searchParams }: PageProps) {
  const carsPromise = fetchHomePageCarData();

  return (
    <>
      <Container className="block md:hidden">
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">"GoodCarMarket"</span>
        </h1>
      </Container>

      <CarImageBanner />

      <HomeSearchCard searchParams={searchParams} />

      <Suspense fallback={<HomeCarsLoading />}>
        <HomeCarsContent carsPromise={carsPromise} />
      </Suspense>

      <HomeSellingSection />

      <HomeAboutUs />
    </>
  );
}
