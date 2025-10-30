import Link from "next/link";
import { SOCIAL_LINK } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import ButtonClipboard from "@/components/ui/button-copy";
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
    type,
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
    { label: "ประเภทรถ", value: type.name },
    { label: "ยี่ห้อ", value: brand.name },
    { label: "รุ่นรถ", value: model },
    { label: "รุ่นย่อย", value: subModel },
    { label: "ปีรถ", value: modelYear },
    { label: "สีรถ", value: displayColor },
    { label: "ระบบเกียร์", value: displayTransmission },
    { label: "ประเภทเครื่องยนต์", value: displayEngineType },
    {
      label: "ขนาดเครื่องยนต์(CC)",
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
          className="flex justify-start border-gray-100 border-b pb-2 font-bold text-lg md:justify-between lg:text-xl"
        >
          <span className="w-[60%] text-neutral-500 md:w-fit">
            {spec.label}
          </span>
          <span className="text-slate-900">{spec.value}</span>
        </div>
      ))}
    </article>
  );

  const renderAction = (
    <div className="space-y-3">
      <ButtonClipboard
        className="!text-lg w-full rounded-xl border border-blue-700 bg-blue-100 font-medium !lg:text-xl text-blue-700 hover:bg-blue-700/90 hover:text-white"
        size="lg"
        type="button"
        aria-label="Copy phone number to clipboard"
        title="Click to copy phone number"
        text="087 534 3889"
        successText="คัดลอกเบอร์โทรแล้ว!"
      />

      <Link href={SOCIAL_LINK.line} target="_blank" passHref>
        <Button
          className="!text-lg w-full rounded-xl border border-[#60C961] bg-primary-500 font-bold !lg:text-xl text-[#60C961] hover:bg-primary-600"
          size="lg"
        >
          LINE ID : 0637098888
        </Button>
      </Link>
    </div>
  );

  // ----------------------------------------------------------------------

  return (
    <aside aria-label="Car information">
      <Card className="gap-5 border-none pb-0 shadow-none md:border md:pb-6 md:shadow-sm">
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
