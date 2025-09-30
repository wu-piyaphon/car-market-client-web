import CarCard from "@/components/ui/custom-card/car-card";
import type { CarListItem } from "@/types/car.types";

type CarListMobileProps = {
  items: CarListItem[];
  total: number;
};

export default function CarListMobile({ items, total }: CarListMobileProps) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="font-bold text-4xl">
        ผลการค้นหา : <span className="text-7xl text-primary">{total}</span>{" "}
        รายการ
      </h2>

      <div className="grid grow-0 grid-cols-2 gap-4">
        {items.map((item) => (
          <CarCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
