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
    <div className="flex flex-row gap-3 items-center md:hidden">
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
            "text-primary size-5 transition-transform duration-300",
            { "rotate-180": isMenuOpen },
          )}
        />
      </Button>

      {/* -- Menu -- */}
      <div
        className={cn(
          "md:hidden transition-transform duration-150 ease-in-out w-screen fixed top-[70px] left-0",
          { "translate-x-0": isMenuOpen, "-translate-x-full": !isMenuOpen },
        )}
      >
        <div className="h-[calc(100vh-70px)] fixed left-0 z-50 bg-white w-full shadow-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-black px-5 py-4 hover:text-white hover:bg-primary items-center flex flex-row justify-between text-xl transition-colors",
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
