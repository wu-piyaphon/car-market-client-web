import Container from "@/components/layout/container";
import CarsFilterMobile from "@/components/sections/cars/cars-filter-mobile";

export default function Page() {
  return (
    <div>
      <Container>
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">“GoodCarMarket”</span>
        </h1>
      </Container>

      <CarsFilterMobile />
    </div>
  );
}
