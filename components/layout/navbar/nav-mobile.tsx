"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navbar";

// ----------------------------------------------------------------------

export default function NavMobile() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="flex flex-row items-center gap-3 md:hidden">
      <Button asChild>
        <Link href={paths.carSelling}>ขายรถ</Link>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Menu
          className={cn(
            "size-5 text-primary transition-transform duration-300",
            { "rotate-180": isMenuOpen },
          )}
        />
      </Button>

      {/* -- Menu -- */}
      <div
        className={cn(
          "fixed top-[70px] left-0 w-screen transition-transform duration-150 ease-in-out md:hidden",
          { "translate-x-0": isMenuOpen, "-translate-x-full": !isMenuOpen },
        )}
      >
        <div className="fixed left-0 z-50 h-[calc(100vh-70px)] w-full bg-white shadow-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex flex-row items-center justify-between px-5 py-4 text-black text-xl transition-colors hover:bg-primary hover:text-white",
                { "bg-primary text-white": isActive(item.href) },
              )}
            >
              {item.name}
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
