import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { fCurrency } from "@/lib/format-string";
import { paths } from "@/lib/paths";
import type { CarListItem } from "@/types/car.types";
import { Button } from "../button";

type CarCardProps = ComponentProps<"div"> & {
  item: CarListItem;
};

export default function CarCard({ item }: CarCardProps) {
  const { thumbnail, model, subModel, type, modelYear, price, slug } = item;

  return (
    <article className="rounded-md shadow-sm">
      <Link href={paths.cars.detail(slug)} passHref>
        <div className="relative h-[110px] w-full cursor-pointer rounded-t-md object-cover transition-opacity hover:opacity-80 md:h-[168px]">
          <Image
            fill
            src={thumbnail}
            alt={model}
            className="rounded-t-md object-cover"
            sizes="100%"
          />
        </div>
      </Link>

      <div className="space-y-2 p-4">
        <div>
          <h3 className="line-clamp-2 break-after-all font-bold text-base text-slate-900 md:text-xl">
            {model} {subModel}
          </h3>
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-slate-400 text-sm md:text-lg">
              {type}
            </p>
          </div>
        </div>

        <hr className="my-2.5 border-gray-200" />

        <div className="flex flex-wrap items-center justify-between">
          <p className="text-base md:text-xl">ปี {modelYear}</p>
          <Button
            className="h-6 gap-1 px-1.5 font-bold text-sm md:h-8 md:text-lg lg:h-9"
            asChild
          >
            <Link href={paths.cars.detail(slug)}>
              {fCurrency(price)}{" "}
              <span className="text-sm md:text-base">บาท</span>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
