import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/container";
import LoanCalculatorCarsContent from "@/components/sections/loan-calculator/loan-calcular-cars-section/loan-calculator-cars-content";
import LoanCalculatorCarsLoading from "@/components/sections/loan-calculator/loan-calcular-cars-section/loan-calculator-cars-loading";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";
import type { CarCardGroup } from "@/components/ui/custom-card/car-card-list";
import { CONFIG } from "@/global-config";
import { fCarCategoryString } from "@/lib/format-string";
import { getCars } from "@/services";
import type { CarCategory } from "@/types/car.types";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | คำนวณสินเชื่อรถยนต์`,
};

// ----------------------------------------------------------------------

async function fetchLoanCalculatorPageData(): Promise<CarCardGroup[]> {
  const CATEGORIES: CarCategory[] = ["NEW"];

  const results = await Promise.all(
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
  );

  return results;
}

export default function Page() {
  const carsPromise = fetchLoanCalculatorPageData();

  return (
    <>
      <Container className="my-8 hidden flex-col gap-14 md:flex lg:my-20">
        <LoanCalculatorForm />
        <Suspense fallback={<LoanCalculatorCarsLoading />}>
          <LoanCalculatorCarsContent carsPromise={carsPromise} />
        </Suspense>
      </Container>

      <div className="flex md:hidden">
        <LoanCalculatorForm />
      </div>
    </>
  );
}
