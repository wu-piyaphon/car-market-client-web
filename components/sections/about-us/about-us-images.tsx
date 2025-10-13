import Image from "next/image";

export default function AboutUsImages() {
  return (
    <div>
      <div className="mt-10 mb-15 flex flex-col gap-6 md:hidden">
        <Image
          src="/images/about-us/img-bottom-right-2.png"
          alt="Description"
          width={600}
          height={600}
          className="h-full max-h-[260px] w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-top-right.png"
          alt="Description"
          width={600}
          height={600}
          className="h-full w-full rounded-xl object-contain"
        />
        <Image
          src="/images/about-us/img-bottom-left.png"
          alt="Description"
          width={600}
          height={600}
          className="h-full max-h-[260px] w-full rounded-xl object-cover"
        />
      </div>

      {/* -- Tablet/Desktop -- */}
      <div className="hidden max-h-[640px] grid-flow-col grid-rows-3 gap-5 md:grid lg:gap-6">
        <div className="col-span-1 row-span-2 rounded-xl bg-primary-500 p-8 font-bold text-white">
          <h2 className="mb-4 text-9xl lg:text-13xl">XX</h2>
          <h2 className="whitespace-pre-line text-3xl lg:text-11xl">{`Years in\nBusiness`}</h2>
        </div>
        <Image
          src="/images/about-us/img-bottom-left.png"
          alt="Description"
          width={500}
          height={500}
          className="col-span-1 row-span-1 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-middle.png"
          alt="Description"
          width={800}
          height={800}
          priority
          className="col-span-4 row-span-3 h-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-top-right.png"
          alt="Description"
          width={1000}
          height={1000}
          className="col-span-5 row-span-2 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-bottom-right-1.png"
          alt="Description"
          width={500}
          height={500}
          className="col-span-2 h-full w-full rounded-xl object-cover"
        />
        <Image
          src="/images/about-us/img-bottom-right-2.png"
          alt="Description"
          width={800}
          height={800}
          className="col-span-3 h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
