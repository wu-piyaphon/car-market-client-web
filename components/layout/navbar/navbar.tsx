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
    href: paths.cars.list,
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
    <nav className="fixed top-0 z-50 h-[70px] w-full bg-white shadow-[0_4px_17px_0_rgba(0,0,0,0.15)] md:h-[76px] lg:h-[106px]">
      <Container className="flex h-full items-center justify-between gap-4">
        <div className="flex h-full flex-auto items-center gap-6 lg:gap-14">
          <Link href={paths.home} className="shrink-0">
            <Image
              src="logo.svg"
              alt="GoodCarMarket Logo"
              width={114}
              height={38}
              className="h-auto w-27 lg:w-38"
              priority
            />
          </Link>

          <NavLinks />
        </div>

        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="outline" asChild>
            <Link href={paths.form.selling}>ขายรถ</Link>
          </Button>
          <Button asChild>
            <Link href={paths.form.estimate}>ประเมินราคา</Link>
          </Button>
        </div>

        <NavMobile />
      </Container>
    </nav>
  );
}
