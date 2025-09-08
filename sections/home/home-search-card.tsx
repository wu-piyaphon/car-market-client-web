import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paths } from "@/lib/paths";
import HomeSearchForm from "./home-search-form";

export default function HomeSearchCard() {
  return (
    <div>
      {/* -- Mobile -- */}
      <Button
        asChild
        className="absolute bottom-3.5 mx-5 h-10 w-[calc(100%-40px)] rounded-md bg-white bg-opacity-30 bg-clip-padding backdrop-blur backdrop-contrast-50 backdrop-saturate-100 backdrop-filter md:hidden"
      >
        <Link href={paths.cars}>
          <Search /> ค้นหารถ
        </Link>
      </Button>

      {/* -- Tablet -- */}
      <Card className="-translate-y-1/2 absolute top-1/2 left-12 hidden min-w-[380px] md:flex lg:min-w-[520px]">
        <CardHeader className="pt-2">
          <CardTitle>ค้นหารถของคุณ</CardTitle>
        </CardHeader>
        <CardContent>
          <HomeSearchForm />
        </CardContent>
      </Card>
    </div>
  );
}
