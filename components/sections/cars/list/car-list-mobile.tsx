import type { RefObject } from "react";
import CarCard from "@/components/ui/custom-card/car-card";
import type { CarListItem } from "@/types/car.types";
import CarListMobileSkeleton from "../skeleton/car-list-mobile-skeleton";
import CarListTrigger from "./car-list-trigger";

type CarListMobileProps = {
  ref: RefObject<HTMLDivElement | null>;
  items: CarListItem[];
  total: number;
  isRouting?: boolean;
  isLoading?: boolean;
  hasMore?: boolean;
};

export default function CarListMobile({
  ref,
  items,
  total,
  isRouting = false,
  isLoading = false,
  hasMore = false,
}: CarListMobileProps) {
  const skeletonCount = items.length % 2 === 0 ? 2 : 1;

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="font-bold text-4xl">
        ผลการค้นหา : <span className="text-7xl text-primary">{total}</span>{" "}
        รายการ
      </h2>

      <div className="grid grow-0 grid-cols-2 gap-4">
        {isRouting ? (
          <CarListMobileSkeleton />
        ) : (
          <>
            {items.map((item) => (
              <CarCard key={item.id} item={item} />
            ))}

            {isLoading && <CarListMobileSkeleton count={skeletonCount} />}

            {hasMore && <CarListTrigger ref={ref} isLoading={isLoading} />}
          </>
        )}
      </div>
    </div>
  );
}
