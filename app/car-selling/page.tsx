import Container from "@/components/layout/container";
import CarSellingForm from "@/components/sections/car-selling/car-selling-form";
import HomeCarList from "@/components/sections/home/home-car-list";

const CATEGORIES = ["รถเข้าใหม่"];

export default function Page() {
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
        <HomeCarList className="grid grid-cols-4" categories={CATEGORIES} />
      </div>
    </Container>
  );
}
