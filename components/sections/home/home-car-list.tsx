import CardItem from "@/components/ui/custom-card/car-card";
import type { CarListItem } from "@/types/car.types";

type HomeCarListProps = {
  title: string;
  items: CarListItem[];
};

export default function HomeCarList({ title, items }: HomeCarListProps) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-row items-center justify-between font-bold text-primary">
        <h3 className="text-3xl lg:text-5xl">{title}</h3>
        <p className="cursor-pointer text-xl">ดูทั้งหมด</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item, index) => (
          <CardItem
            key={`${title}-${item.id}`}
            item={item}
            className={`${index >= 2 ? "hidden lg:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
