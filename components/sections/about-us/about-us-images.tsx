import Image from "next/image";

export default function AboutUsImages() {
  return (
    <div>
      <div className="mt-10 mb-15 flex flex-col gap-6 md:hidden">
        <Image
          src="/images/about-us/img-bottom-right-2.webp"
          alt="ลานจอดรถยนต์มือสอง GoodCarMarket"
          width={600}
          height={600}
          sizes="100vw"
          className="h-full max-h-[260px] w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-top-right.webp"
          alt="โชว์รูมรถยนต์มือสอง GoodCarMarket"
          width={600}
          height={600}
          sizes="100vw"
          className="h-full w-full rounded-xl object-contain"
        />
        <Image
          src="/images/about-us/img-bottom-left.webp"
          alt="ทีมงานผู้เชี่ยวชาญ GoodCarMarket"
          width={600}
          height={600}
          sizes="100vw"
          className="h-full max-h-[260px] w-full rounded-xl object-cover"
        />
      </div>

      {/* -- Tablet/Desktop -- */}
      <div className="hidden max-h-[640px] grid-flow-col grid-rows-3 gap-5 md:grid lg:gap-6">
        <div className="col-span-1 row-span-2 rounded-xl bg-primary-500 p-8 font-bold text-white">
          <h2 className="mb:2 text-15xl lg:mb-4">7</h2>
          <h2 className="whitespace-pre-line text-5xl lg:text-11xl">{`Years in\nBusiness`}</h2>
        </div>
        <Image
          src="/images/about-us/img-bottom-left.webp"
          alt="ทีมงานผู้เชี่ยวชาญ GoodCarMarket"
          width={500}
          height={500}
          sizes="(max-width: 1024px) 20vw, 15vw"
          className="col-span-1 row-span-1 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-middle.webp"
          alt="บรรยากาศภายใน GoodCarMarket ตลาดรถยนต์มือสอง"
          width={800}
          height={800}
          priority
          sizes="(max-width: 1024px) 40vw, 35vw"
          className="col-span-4 row-span-3 h-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-top-right.webp"
          alt="โชว์รูมรถยนต์มือสอง GoodCarMarket"
          width={1000}
          height={1000}
          sizes="(max-width: 1024px) 35vw, 30vw"
          className="col-span-5 row-span-2 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-bottom-right-1.webp"
          alt="รถยนต์มือสองคุณภาพ GoodCarMarket"
          width={500}
          height={500}
          sizes="(max-width: 1024px) 15vw, 12vw"
          className="col-span-2 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-bottom-right-2.webp"
          alt="ลานจอดรถยนต์มือสอง GoodCarMarket"
          width={800}
          height={800}
          sizes="(max-width: 1024px) 20vw, 18vw"
          className="col-span-3 h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
