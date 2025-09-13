import Container from "@/components/layout/container";
import CarsFilter from "@/components/sections/cars/cars-filter";
import CarsFilterMobile from "@/components/sections/cars/cars-filter-mobile";

export default function Page() {
  return (
    <Container>
      <CarsFilterMobile />

      <CarsFilter />
    </Container>
  );
}
