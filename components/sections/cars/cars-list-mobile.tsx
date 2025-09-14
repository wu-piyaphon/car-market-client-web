import CarCard from "@/components/ui/custom-card/car-card";
import { CAR_LIST_ITEM } from "@/mocks/mock-car";

export default function CarsListMobile() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-4xl">
        ผลการค้นหา : <span className="text-7xl text-primary">852</span> รายการ
      </h2>

      <div className="grid grow-0 grid-cols-2 gap-4">
        <CarCard item={CAR_LIST_ITEM} />
        <CarCard item={CAR_LIST_ITEM} />
        <CarCard item={CAR_LIST_ITEM} />
        <CarCard item={CAR_LIST_ITEM} />
      </div>
    </div>
  );
}
