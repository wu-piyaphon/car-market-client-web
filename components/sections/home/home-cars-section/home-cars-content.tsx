"use client";

import { use } from "react";
import Container from "@/components/layout/container";
import HomeCarsTabs from "@/components/sections/home/home-cars-section/home-cars-tabs";
import HomeFacebookCover from "@/components/sections/home/home-facebook-cover";
import CarCardList, {
  type CarCardGroup,
} from "@/components/sections/shared/car-card-list";

// ----------------------------------------------------------------------

type HomeCarsContentProps = {
  carsPromise: Promise<CarCardGroup[]>;
};

// ----------------------------------------------------------------------

export default function HomeCarsContent({ carsPromise }: HomeCarsContentProps) {
  const groups = use(carsPromise);

  return (
    <>
      <Container className="mt-18 hidden flex-row gap-4 md:flex lg:gap-9">
        <CarCardList groups={groups} />
        <HomeFacebookCover />
      </Container>

      <HomeCarsTabs groups={groups} />
    </>
  );
}
