import Container from "@/components/layout/container";
import HomeCarList from "@/components/sections/home/home-car-list";
import LoanForm from "@/components/sections/loan-calculator/loan-form";

const CATEGORIES = ["รถเข้าใหม่"];

export default function Page() {
  return (
    <>
      <Container className="my-8 hidden flex-col gap-14 md:flex lg:my-20">
        <LoanForm />
        <HomeCarList categories={CATEGORIES} />
      </Container>

      <LoanForm />
    </>
  );
}
