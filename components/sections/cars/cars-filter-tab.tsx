import { SvgIcon } from "@/components/icons";
import CarCard from "@/components/ui/custom-card/car-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CAR_LIST_ITEM } from "@/mocks/mock-car";

const TAB_VALUES = [
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
];

export default function CarsFilterTabs() {
  return (
    <Tabs defaultValue="ALL" className="flex flex-1 gap-5">
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

      {TAB_VALUES.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="grid grow-0 grid-cols-2 gap-4 lg:grid-cols-4"
        >
          <CarCard item={CAR_LIST_ITEM} />
          <CarCard item={CAR_LIST_ITEM} />
          <CarCard item={CAR_LIST_ITEM} />
          <CarCard item={CAR_LIST_ITEM} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
