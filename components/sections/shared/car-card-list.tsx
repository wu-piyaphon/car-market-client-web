import type { ComponentProps } from "react";
import CarCard from "@/components/ui/custom-card/car-card";
import { cn } from "@/lib/utils";
import type { CarListItem } from "@/types/car.types";

// ----------------------------------------------------------------------

export type CarCardGroup = {
  title: string;
  list: CarListItem[];
};

// ----------------------------------------------------------------------

type CarCardListProps = ComponentProps<"div"> & { groups: CarCardGroup[] };

// ----------------------------------------------------------------------

export default function CarCardList({ groups, className }: CarCardListProps) {
  return (
    <div className="w-full space-y-7 lg:gap-10">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-1 flex-col gap-3">
          <div className="flex flex-row items-center justify-between font-bold text-primary">
            <h3 className="text-3xl lg:text-5xl">{group.title}</h3>
            <p className="cursor-pointer text-xl">ดูทั้งหมด</p>
          </div>

          <div
            className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}
          >
            {group.list.map((carItem, index) => (
              <CarCard
                key={`${group.title}-${index}`}
                item={carItem}
                className={cn({ "hidden lg:block": index >= 2 })}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
