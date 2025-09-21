import type { ComponentProps } from "react";
import CarCard from "@/components/ui/custom-card/car-card";
import { cn } from "@/lib/utils";
import { CAR_LIST } from "@/mocks/mock-car";

type HomeCarListProps = ComponentProps<"div"> & { categories: string[] };

export default function HomeCarList({
  categories,
  className,
}: HomeCarListProps) {
  return (
    <div className="w-full space-y-7 lg:gap-10">
      {categories.map((category) => (
        <div key={category} className="flex flex-1 flex-col gap-3">
          <div className="flex flex-row items-center justify-between font-bold text-primary">
            <h3 className="text-3xl lg:text-5xl">{category}</h3>
            <p className="cursor-pointer text-xl">ดูทั้งหมด</p>
          </div>

          <div
            className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}
          >
            {CAR_LIST.map((item, index) => (
              <CarCard
                key={`${category}-${item.id}-${index}`}
                item={item}
                className={`${index >= 2 ? "hidden lg:block" : ""}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
