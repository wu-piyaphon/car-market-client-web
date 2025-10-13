import { type RefObject, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { SvgIcon } from "@/components/icons";
import CarCard from "@/components/ui/custom-card/car-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import type { CarListItem, CarType } from "@/types/car.types";
import CarListSkeleton from "../skeleton/car-list-skeleton";
import CarListTrigger from "./car-list-trigger";

// ----------------------------------------------------------------------

type TabValue = {
  value: "ALL" | "NEW" | CarType;
  label: string;
  icon?: React.ReactNode;
};

type CarListProps = {
  ref: RefObject<HTMLDivElement | null>;
  items: CarListItem[];
  isLoading?: boolean;
  hasMore?: boolean;
};

const TAB_VALUES: TabValue[] = [
  { value: "ALL", label: "รถทั้งหมด" },
  {
    value: "NEW",
    label: "รถเข้าใหม่",
    icon: <SvgIcon name="new" className="size-4.5" />,
  },
  {
    value: "SEDAN",
    label: "รถเก๋ง",
    icon: <SvgIcon name="sedan" />,
  },
  {
    value: "PICKUP",
    label: "รถกระบะ",
    icon: <SvgIcon name="pickup" className="size-4.5" />,
  },
  {
    value: "SUV",
    label: "รถ SUV",
    icon: <SvgIcon name="suv" className="size-4.5" />,
  },
  {
    value: "VAN",
    label: "รถตู้",
    icon: <SvgIcon name="van" className="size-4.5" />,
  },
];

// ----------------------------------------------------------------------

export default function CarList({
  ref,
  items,
  isLoading = false,
  hasMore = false,
}: CarListProps) {
  const { setValue, control } = useFormContext<CarFilterSchema>();

  const [tabValue, setTabValue] = useState<TabValue["value"]>("ALL");

  const [type] = useWatch({ control, name: ["type"] });

  const skeletonCount = items.length % 4 === 0 ? 4 : 4 - (items.length % 4);

  const handleTabChange = (value: TabValue["value"]) => {
    const tab = TAB_VALUES.find((tab) => {
      return tab.value === value;
    });

    if (!tab) return;

    setTabValue(value);

    if (value === "ALL") {
      setValue("category", "");
      setValue("type", "");
      return;
    }

    if (tab.value === "NEW") {
      setValue("category", value);
      setValue("type", "");
      return;
    }

    setValue("type", value as CarType);
    setValue("category", "");
    return;
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (type) {
      setTabValue(type);
    }
  }, [type]);

  // ----------------------------------------------------------------------

  return (
    <Tabs
      value={tabValue}
      onValueChange={(value) => handleTabChange(value as TabValue["value"])}
      className="flex flex-1 gap-5"
    >
      <TabsList className="gap-4">
        {TAB_VALUES.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-9 max-w-[105px] rounded-full"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="grid grow-0 grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <CarCard key={item.id} item={item} />
        ))}

        {isLoading && <CarListSkeleton count={skeletonCount} />}

        {hasMore && <CarListTrigger ref={ref} isLoading={isLoading} />}
      </div>
    </Tabs>
  );
}
