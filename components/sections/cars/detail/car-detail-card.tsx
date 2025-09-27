import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CAR_COLORS,
  CAR_ENGINE_TYPES,
  CAR_TRANSMISSIONS,
} from "@/lib/constants/car.constants";
import { fCurrency } from "@/lib/format-string";
import type { CarDetail } from "@/types/car.types";

// ----------------------------------------------------------------------

type CarDetailInfoProps = {
  data: CarDetail;
};

// ----------------------------------------------------------------------

export default function CarDetailCard({ data }: CarDetailInfoProps) {
  const {
    brand,
    model,
    subModel,
    modelYear,
    transmission,
    color,
    engineType,
    engineCapacity,
    mileage,
    price,
  } = data;

  const displayColor = CAR_COLORS.find((c) => c.id === color)?.name || color;
  const displayEngineType =
    CAR_ENGINE_TYPES.find((e) => e.id === engineType)?.name || engineType;
  const displayTransmission =
    CAR_TRANSMISSIONS.find((t) => t.id === transmission)?.name || transmission;

  const carSpecifications = [
    { label: "ปีรถยนต์", value: modelYear },
    { label: "รุ่นรถ", value: model },
    { label: "รุ่นย่อย", value: subModel },
    { label: "ปีรุ่น", value: modelYear },
    { label: "สีรถ", value: displayColor },
    { label: "ระบบเกียร์", value: displayTransmission },
    { label: "ประเภทเครื่องยนต์", value: displayEngineType },
    {
      label: "ประกันเครื่องยนต์(CC)",
      value: engineCapacity ? `${engineCapacity}CC` : "-",
    },
    { label: "เลขไมล์", value: mileage ? `${fCurrency(mileage)} กม.` : "-" },
  ];

  // ----------------------------------------------------------------------

  const renderContent = (
    <article className="space-y-3">
      {carSpecifications.map((spec) => (
        <div
          key={spec.label}
          className="flex justify-between border-gray-100 border-b pb-2 font-bold text-lg lg:text-xl"
        >
          <span className="text-neutral-500">{spec.label}</span>
          <span className="text-slate-900">{spec.value}</span>
        </div>
      ))}
    </article>
  );

  const renderAction = (
    <div className="space-y-3">
      <Button
        className="!text-lg w-full rounded-xl border border-blue-700 bg-blue-100 font-medium !lg:text-xl text-blue-700 hover:bg-blue-700/90 hover:text-white"
        size="lg"
      >
        087 534 3889
      </Button>

      <Button
        className="!text-lg w-full rounded-xl border border-[#60C961] bg-primary-500 font-bold !lg:text-xl text-[#60C961] hover:bg-primary-600"
        size="lg"
      >
        LINE ID : xxxxxxxxxx
      </Button>
    </div>
  );

  // ----------------------------------------------------------------------

  return (
    <aside aria-label="Car information">
      <Card className="gap-5">
        <CardHeader className="gap-3">
          <CardTitle className="font-bold text-3xl text-slate-900 lg:text-6xl">
            {brand.name} {model} ({subModel})
          </CardTitle>
          <div className="font-bold text-3xl text-primary lg:text-6xl">
            {fCurrency(price)} บาท
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {renderContent}

          {renderAction}
        </CardContent>
      </Card>
    </aside>
  );
}
