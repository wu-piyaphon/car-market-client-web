import { use } from "react";
import CarCardList, { type CarCardGroup } from "../../shared/car-card-list";

type CarSellingCarsContentProps = {
  carsPromise: Promise<CarCardGroup[]>;
  className?: string;
};

export default function CarSellingCarsContent({
  carsPromise,
  className,
}: CarSellingCarsContentProps & { className?: string }) {
  const groups = use(carsPromise);

  return <CarCardList groups={groups} className={className} />;
}
