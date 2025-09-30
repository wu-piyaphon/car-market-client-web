import Container from "@/components/layout/container";
import CarCard from "@/components/ui/custom-card/car-card";
import CarCardThumbnail from "@/components/ui/custom-card/car-card-thumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CarCardGroup } from "../../../ui/custom-card/car-card-list";

// ----------------------------------------------------------------------

type HomeCarsTabsProps = {
  groups: CarCardGroup[];
};

// ----------------------------------------------------------------------

export default function HomeCarsTabs({ groups }: HomeCarsTabsProps) {
  const defaultTab = groups.length > 0 ? groups[0].title : "NEW";

  return (
    <Container className="mt-8 flex flex-col md:hidden">
      <h5 className="font-bold text-4xl text-primary">ประเภทรถ</h5>

      <Tabs defaultValue={defaultTab} className="mt-3 mb-4">
        <TabsList className="gap-6">
          {groups.map((group) => (
            <TabsTrigger key={group.title} value={group.title}>
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map((group) => (
          <TabsContent
            key={group.title}
            value={group.title}
            className="grid grid-cols-2 gap-4"
          >
            <CarCardThumbnail title={group.title} />
            {group.list.slice(0, 4).map((carItem) => (
              <CarCard key={carItem.id} item={carItem} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}
