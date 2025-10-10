"use client";

import { MessageCircleMore } from "lucide-react";
import { useState } from "react";

export default function ActionButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed right-3 bottom-8 z-50 md:right-8">
      {/* -- Chat Label -- */}
      <div
        className={`absolute right-17 bottom-2 flex items-center transition-all duration-300 ease-in-out ${
          isHovered
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-4 opacity-0"
        }`}
      >
        <div className="rounded-lg border bg-white px-4 py-2 shadow-lg">
          <span className="whitespace-nowrap font-bold text-gray-700 text-xl">
            แชทกับเรา
          </span>
          {/* -- Arrow -- */}
          <div className="-translate-y-1/2 absolute top-1/2 right-[-6px] h-3 w-3 rotate-45 border-t border-r bg-white"></div>
        </div>
      </div>

      {/* -- Action Button -- */}
      <button
        type="button"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircleMore className="h-7 w-7" />
      </button>
    </div>
  );
}
