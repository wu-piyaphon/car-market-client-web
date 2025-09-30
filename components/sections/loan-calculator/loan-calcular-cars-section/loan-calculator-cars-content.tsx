import { use } from "react";
import CarCardList, {
  type CarCardGroup,
} from "../../../ui/custom-card/car-card-list";

// ----------------------------------------------------------------------

type LoanCalculatorCarsContentProps = {
  carsPromise: Promise<CarCardGroup[]>;
};

// ----------------------------------------------------------------------

export default function LoanCalculatorCarsContent({
  carsPromise,
}: LoanCalculatorCarsContentProps) {
  const groups = use(carsPromise);

  return <CarCardList groups={groups} />;
}
