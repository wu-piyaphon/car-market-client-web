"use client";

import { Calculator, Home, Info, Menu, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import { cn } from "@/lib/utils";
import Container from "../container";
import NavMenu from "./nav-menu";

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
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (navRef.current) {
      const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);
      if (activeIndex !== -1) {
        const navItems = navRef.current.children;
        const activeItem = navItems[activeIndex] as HTMLElement;
        if (activeItem) {
          setIndicatorStyle({
            left: activeItem.offsetLeft,
            width: activeItem.offsetWidth,
          });
        }
      }
    }
  }, [pathname]);

  return (
    <nav className="shadow">
      <Container className="mx-auto gap-4 h-[70px] md:h-[76px] lg:h-[106px] flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-14 h-full flex-auto">
          {/* -- Logo -- */}
          <Link href={paths.home} className="shrink-0">
            <Image
              src="good-car-logo.svg"
              alt="Good Car Market Logo"
              width={114}
              height={38}
              className="w-27 lg:w-38 h-auto"
            />
          </Link>

          {/* -- Navigation Links -- */}
          <div
            ref={navRef}
            className="hidden md:flex gap-8 lg:gap-10 justify-between relative h-full"
          >
            {NAV_ITEMS.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "gap-1 py-4 lg:py-6 text-center flex-wrap text-black hover:text-primary items-center justify-center flex flex-row text-base lg:text-xl transition-colors",
                    { "text-primary": pathname === item.href },
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
            <div
              className="absolute bottom-0 h-2 shadow-[0_0_8px_0_rgba(96,203,189,0.8)] rounded-t-md bg-primary transition-all duration-300 ease-in-out"
              style={{
                left: `${indicatorStyle.left - 4}px`,
                width: `${indicatorStyle.width + 12}px`,
              }}
            />
          </div>
        </div>

        {/* -- Action Buttons -- */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={paths.carSelling}>ขายรถ</Link>
          </Button>
          <Button asChild>
            <Link href={paths.carValuation}>ประเมินราคา</Link>
          </Button>
        </div>

        {/* -- Mobile Nav -- */}
        <div className="flex flex-row gap-3 items-center md:hidden">
          <Button asChild>
            <Link href={paths.carSelling}>ขายรถ</Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu
              className={cn(
                "text-primary size-5 transition-transform duration-300",
                { "rotate-180": isMenuOpen },
              )}
            />
          </Button>
        </div>
      </Container>

      {/* -- Mobile Menu -- */}
      <div
        className={cn(
          "md:hidden transition-transform duration-150 ease-in-out",
          { "translate-x-0": isMenuOpen, "-translate-x-full": !isMenuOpen },
        )}
      >
        <NavMenu onNavigate={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
}
