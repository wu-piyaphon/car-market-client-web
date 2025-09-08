"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navbar";

// ----------------------------------------------------------------------

export default function NavLinks() {
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
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
  );
}
