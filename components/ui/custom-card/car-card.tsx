import Image from "next/image";
import type { ComponentProps } from "react";
import { fCurrency } from "@/lib/format-string";
import type { CarListItem } from "@/types/car.types";
import { Button } from "../button";

type CarCardProps = ComponentProps<"div"> & {
  item: CarListItem;
};

export default function CarCard({ item }: CarCardProps) {
  const { thumbnail, model, subModel, type, modelYear, price } = item;

  return (
    <article className="rounded-md shadow-sm">
      <Image
        src={thumbnail}
        alt={model}
        width={230}
        height={168}
        className="h-[110px] w-full rounded-t-md object-cover md:h-[168px]"
      />

      <div className="space-y-2 p-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 md:text-xl">
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
          <Button className="h-6 gap-1 px-1.5 font-bold text-sm md:h-8 md:text-lg lg:h-9">
            {fCurrency(price)} <span className="text-sm md:text-base">บาท</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
