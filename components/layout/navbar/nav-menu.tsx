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
    <div className="h-[calc(100vh-70px)] fixed left-0 z-50 bg-white w-full shadow-lg">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onNavigate}
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
  );
}
