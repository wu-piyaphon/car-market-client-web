import Image from "next/image";
import { Button } from "../button";

export default function CarCardThumbnail() {
  return (
    <div className="relative max-h-[220px] overflow-hidden rounded-md p-1.5 shadow-sm">
      <Image
        src="/images/car-type-thumbnail.png"
        alt="Car Type Thumbnail"
        width={400}
        height={200}
        className="absolute top-0 h-[112px] w-full object-cover object-left"
      />

      <div className="mt-[112px] flex flex-col gap-2.5">
        <p className="font-bold text-xl">รถเข้าใหม่ทุกคัน</p>
        <p className="whitespace-pre-line text-sm">{`ค้นหารถเข้าใหม่ที่คุณสนใจที่\nGoodCarMarket`}</p>

        <Button className="h-6 w-full gap-1 px-1.5 font-bold text-sm md:h-8 md:text-lg lg:h-9">
          ดูต่อ
        </Button>
      </div>
    </div>
  );
}
