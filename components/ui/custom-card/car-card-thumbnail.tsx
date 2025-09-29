import Image from "next/image";
import { Button } from "../button";

type CarCardThumbnailProps = {
  title: string;
};

export default function CarCardThumbnail({ title }: CarCardThumbnailProps) {
  return (
    <div className="relative max-h-[220px] overflow-hidden rounded-md p-1.5 shadow-sm">
      <Image
        src="/images/home/card-thumbnail.png"
        alt="Car Type Thumbnail"
        width={400}
        height={200}
        className="absolute top-0 right-0 h-[112px] w-[85%] object-cover object-left-bottom"
      />

      <div className="mt-[112px] flex flex-col gap-2.5">
        <p className="font-bold text-xl">{title}ทุกคัน</p>
        <p className="whitespace-pre-line text-sm">{`ค้นหารถเข้าใหม่ที่คุณสนใจที่\nGoodCarMarket`}</p>

        <Button className="h-6 w-full px-1.5 py-0 font-bold text-sm">
          ดูต่อ
        </Button>
      </div>
    </div>
  );
}
