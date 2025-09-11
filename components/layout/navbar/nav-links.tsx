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
    const updateIndicatorPosition = () => {
      if (navRef.current) {
        const activeIndex = NAV_ITEMS.findIndex(
          (item) => item.href === pathname,
        );
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
    };

    // Initial calculation
    updateIndicatorPosition();

    // Set up ResizeObserver to watch for size changes
    let resizeObserver: ResizeObserver | null = null;

    if (navRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateIndicatorPosition();
      });
      resizeObserver.observe(navRef.current);
    }

    // Cleanup
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [pathname]);

  return (
    <div
      ref={navRef}
      className="relative hidden h-full justify-between gap-8 md:flex lg:gap-10"
    >
      {NAV_ITEMS.map((item) => {
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-row flex-wrap items-center justify-center gap-1 py-4 text-center text-base text-black transition-colors hover:text-primary lg:py-6 lg:text-xl",
              { "text-primary": pathname === item.href },
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
      <div
        className="absolute bottom-0 h-2 rounded-t-md bg-primary shadow-[0_0_8px_0_rgba(96,203,189,0.8)] transition-all duration-300 ease-in-out"
        style={{
          left: `${indicatorStyle.left - 4}px`,
          width: `${indicatorStyle.width + 12}px`,
        }}
      />
    </div>
  );
}
