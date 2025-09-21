import Container from "@/components/layout/container";
import HomeCarList from "@/components/sections/home/home-car-list";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";

const CATEGORIES = ["รถเข้าใหม่"];

export default function Page() {
  return (
    <>
      <Container className="my-8 hidden flex-col gap-14 md:flex lg:my-20">
        <LoanCalculatorForm />
        <HomeCarList categories={CATEGORIES} />
      </Container>

      <div className="flex md:hidden">
        <LoanCalculatorForm />
      </div>
    </>
  );
}
