import Container from "@/components/layout/container";
import CardItem from "@/components/ui/custom-card/car-card";
import CarCardThumbnail from "@/components/ui/custom-card/car-card-thumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CAR_LIST_ITEM } from "@/mocks/mock-car";

const TAB_VALUES = [
  { value: "NEW", label: "รถเข้าใหม่" },
  { value: "SEDAN", label: "รถเก๋ง" },
  { value: "PICKUP", label: "รถกระบะ" },
  { value: "SUV", label: "รถ SUV" },
];

export default function HomeCarTabs() {
  return (
    <Container className="flex flex-col pt-8 md:hidden">
      <h5 className="font-bold text-4xl text-primary">ประเภทรถ</h5>

      <Tabs defaultValue="NEW" className="mt-3 mb-4">
        <TabsList className="gap-6">
          {TAB_VALUES.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_VALUES.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="grid grid-cols-2 gap-4"
          >
            <CarCardThumbnail />
            <CardItem item={CAR_LIST_ITEM} />
            <CardItem item={CAR_LIST_ITEM} />
            <CardItem item={CAR_LIST_ITEM} />
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}
