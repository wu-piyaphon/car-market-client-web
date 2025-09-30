import { Suspense } from "react";
import Container from "@/components/layout/container";
import LoanCalculatorCarsContent from "@/components/sections/loan-calculator/loan-calcular-cars-section/loan-calculator-cars-content";
import LoanCalculatorCarsLoading from "@/components/sections/loan-calculator/loan-calcular-cars-section/loan-calculator-cars-loading";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";
import type { CarCardGroup } from "@/components/ui/custom-card/car-card-list";
import { fCarCategoryString } from "@/lib/format-string";
import { getCars } from "@/services";
import type { CarCategory } from "@/types/car.types";

async function fetchLoanCalculatorPageData(): Promise<CarCardGroup[]> {
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
