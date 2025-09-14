"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import Container from "@/components/layout/container";
import CarsFilterMobile from "@/components/sections/cars/cars-filter-mobile";
import CarsFilterSidebar from "@/components/sections/cars/cars-filter-sidebar";
import CarsFilterTabs from "@/components/sections/cars/cars-filter-tab";
import CarsListMobile from "@/components/sections/cars/cars-list-mobile";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "@/lib/schemas/cars-filter-schema";

export default function Page() {
  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: {
      brand: "",
      type: "",
      maxPrice: "",
      minPrice: "",
    },
  });

  return (
    <Form methods={methods}>
      {/* -- Mobile -- */}
      <Container className="mb-2 md:hidden">
        <CarsFilterMobile />
        <CarsListMobile />
      </Container>

      {/* -- Tablet/Desktop -- */}
      <Container className="my-12 hidden flex-row md:flex md:gap-5 lg:gap-6">
        <CarsFilterSidebar />
        <CarsFilterTabs />
      </Container>
    </Form>
  );
}
