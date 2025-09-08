import { Calculator, Home, Info, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import Container from "../container";
import NavLinks from "./nav-links";
import NavMobile from "./nav-mobile";

// ----------------------------------------------------------------------

export const NAV_ITEMS = [
  {
    name: "หน้าหลัก",
    href: paths.home,
    icon: <Home className="size-4 lg:size-6" />,
  },
  {
    name: "ค้นหารถ",
    href: paths.cars,
    icon: <Search className="size-4 lg:size-6" />,
  },
  {
    name: "คำนวณสินเชื่อ",
    href: paths.loanCalculator,
    icon: <Calculator className="size-4 lg:size-6" />,
  },
  {
    name: "เกี่ยวกับเรา",
    href: paths.aboutUs,
    icon: <Info className="size-4 lg:size-6" />,
  },
  {
    name: "ติดต่อเรา",
    href: paths.contactUs,
    icon: <Phone className="size-4 lg:size-6" />,
  },
];

// ----------------------------------------------------------------------

export default function Navbar() {
  return (
    <nav className="shadow fixed w-full bg-white">
      <Container className="mx-auto gap-4 h-[70px] md:h-[76px] lg:h-[106px] flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-14 h-full flex-auto">
          <Link href={paths.home} className="shrink-0">
            <Image
              src="good-car-logo.svg"
              alt="Good Car Market Logo"
              width={114}
              height={38}
              className="w-27 lg:w-38 h-auto"
            />
          </Link>

          <NavLinks />
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={paths.carSelling}>ขายรถ</Link>
          </Button>
          <Button asChild>
            <Link href={paths.carValuation}>ประเมินราคา</Link>
          </Button>
        </div>

        <NavMobile />
      </Container>
    </nav>
  );
}
