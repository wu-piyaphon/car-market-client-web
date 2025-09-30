import { Search } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paths } from "@/lib/paths";
import { getCarFilters } from "@/services/car.services";
import HomeSearchForm from "./home-search-form";

export default async function HomeSearchCard() {
  const carFilters = await getCarFilters();

  const {
    types = [],
    models = [],
    brands = [],
  } = carFilters.success ? carFilters.data : {};

  return (
    <div className="relative">
      {/* -- Mobile -- */}
      <Button
        asChild
        className="absolute bottom-3.5 mx-5 h-10 w-[calc(100%-40px)] rounded-md bg-white bg-opacity-30 bg-clip-padding backdrop-blur backdrop-contrast-50 backdrop-saturate-100 backdrop-filter md:hidden"
      >
        <Link href={paths.cars.list}>
          <Search /> ค้นหารถ
        </Link>
      </Button>

      {/* -- Tablet -- */}
      <Container className="relative hidden md:flex">
        <Card className="-translate-y-[calc(105%)] lg:-translate-y-[calc(107%)] absolute min-w-[380px] lg:min-w-[520px]">
          <CardHeader className="pt-2">
            <CardTitle className="text-neutral-800">ค้นหารถของคุณ</CardTitle>
          </CardHeader>
          <CardContent>
            <HomeSearchForm
              typeOptions={types}
              modelOptions={models}
              brandOptions={brands}
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
