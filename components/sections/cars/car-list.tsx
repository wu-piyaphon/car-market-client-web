import { useFormContext } from "react-hook-form";
import { SvgIcon } from "@/components/icons";
import CarCard from "@/components/ui/custom-card/car-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import type { CarCategory, CarListItem, CarType } from "@/types/car.types";

const TAB_VALUES = [
  { value: "ALL", label: "รถทั้งหมด" },
  {
    type: "CATEGORY",
    value: "NEW",
    label: "รถเข้าใหม่",
    icon: <SvgIcon name="new" className="size-4.5" />,
  },
  {
    type: "CAR_TYPE",
    value: "SEDAN",
    label: "รถเก๋ง",
    icon: <SvgIcon name="sedan" />,
  },
  {
    type: "CAR_TYPE",
    value: "PICKUP",
    label: "รถกระบะ",
    icon: <SvgIcon name="pickup" className="size-4.5" />,
  },
  {
    type: "CAR_TYPE",
    value: "SUV",
    label: "รถ SUV",
    icon: <SvgIcon name="suv" className="size-4.5" />,
  },
];

type CarListProps = {
  items: CarListItem[];
};

export default function CarList({ items }: CarListProps) {
  const { setValue } = useFormContext<CarFilterSchema>();

  const handleTabChange = (value: string) => {
    const tab = TAB_VALUES.find((tab) => {
      return tab.value === value;
    });
    if (!tab) return;

    if (value === "ALL") {
      console.log("hello");
      setValue("category", "");
      setValue("type", "");
      return;
    }

    if (tab.type === "CAR_TYPE") {
      setValue("type", value as CarType);
      setValue("category", "");
      return;
    }

    if (tab.type === "CATEGORY") {
      setValue("category", value as CarCategory);
    }
  };

  return (
    <Tabs
      defaultValue="ALL"
      onValueChange={handleTabChange}
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
      </div>
    </Tabs>
  );
}
