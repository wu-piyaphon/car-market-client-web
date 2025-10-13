import Image from "next/image";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { Button } from "../button";

type CarCardThumbnailProps = {
  title: string;
};

export default function CarCardThumbnail({ title }: CarCardThumbnailProps) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-md p-1.5 shadow-sm">
      <Image
        src="/images/home/card-thumbnail.png"
        alt="Car Type Thumbnail"
        width={400}
        height={200}
        className="absolute top-0 right-0 h-[112px] w-[85%] object-cover object-left-bottom"
      />

      <div className="mt-[112px] flex h-full flex-col justify-between gap-2.5">
        <div>
          <p className="font-bold text-xl">{title}ทุกคัน</p>
          <p className="whitespace-pre-line text-sm">{`ค้นหารถเข้าใหม่ที่คุณสนใจที่\nGoodCarMarket`}</p>
        </div>

        <Link href={paths.cars.list} aria-label="ดูต่อ" passHref>
          <Button className="mb-2 h-6 w-full px-1.5 py-0 font-bold text-sm">
            ดูต่อ
          </Button>
        </Link>
      </div>
    </div>
  );
}
