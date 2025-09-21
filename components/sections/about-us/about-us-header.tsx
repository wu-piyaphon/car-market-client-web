import Image from "next/image";

export default function AboutUsHeader() {
  return (
    <div>
      <div className="flex flex-col items-center gap-8 text-center md:hidden">
        <h2 className="font-bold text-5xl text-slate-900">เกี่ยวกับเรา</h2>
        <Image
          src="/logo.svg"
          alt="GoodCarMarket Logo"
          width={200}
          height={200}
          className="object-cover"
        />
        <div className="w-full space-y-2 text-left">
          <h2 className="font-bold text-7xl text-primary-500">GoodCarMarket</h2>
          <p className="whitespace-pre-line text-slate-900 text-xl">
            {`Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget sit urna. Eu duis lectus amet vestibulum varius. Nibh tellus sit sit at lorem facilisis.\n\nNunc vulputate ac interdum aliquet vestibulum in tellus.`}
          </p>
        </div>
      </div>

      {/* -- Tablet/Desktop -- */}
      <div className="hidden flex-row justify-between gap-8 md:flex">
        <h2 className="flex-1 whitespace-pre-line font-bold text-6xl leading-tight lg:text-11xl">
          We Value Our Clients And Want Them To Have A Nice Experience
        </h2>
        <div className="flex flex-1 flex-col gap-3 text-base lg:text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget
            sit urna. Eu duis lectus amet vestibulum varius. Nibh tellus sit sit
            at lorem facilisis. Nunc vulputate ac interdum aliquet vestibulum in
            tellus.
          </p>
          <p>
            Sit convallis rhoncus dolor purus amet orci urna. Lobortis vulputate
            vestibulum consectetur donec ipsum egestas velit laoreet justo. Eu
            dignissim egestas egestas ipsum. Sit est nunc pellentesque at a
            aliquam ultrices consequat. Velit duis velit nec amet eget eu morbi.
            Libero non diam sit viverra dignissim. Aliquam tincidunt in cursus
            euismod enim.
          </p>
          <p>
            Magna odio sed ornare ultrices. Id lectus mi amet sit at sit arcu mi
            nisl. Mauris egestas arcu mauris.
          </p>
        </div>
      </div>
    </div>
  );
}
