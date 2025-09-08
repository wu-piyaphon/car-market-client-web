"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navbar";

type Props = {
  onNavigate: () => void;
};

export default function NavMenu({ onNavigate }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="fixed left-0 z-50 h-[calc(100vh-70px)] w-full bg-white shadow-lg">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onNavigate}
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
  );
}
