import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomeAboutUs() {
  return (
    <article>
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex flex-col gap-4 text-primary">
          <h2 className="whitespace-pre-line font-bold text-4xl leading-snug">{`รู้จัก GoodCarMarket\nแล้วรึยัง?`}</h2>
          <p className="whitespace-pre-line text-base">
            {`Choose from thousands of vehicles from multiple\nbrands and buy online with Click & Drive, or visit\nus at one of our dealerships today.`}
          </p>
        </div>

        <div className="relative h-[280px] w-full px-5">
          <Image src="/images/home/about-us.png" alt="About Us" fill />
        </div>

        <Button size="lg">เกี่ยวกับเรา</Button>
      </div>

      <div className="hidden md:flex md:flex-row md:items-center md:gap-10 lg:gap-20">
        <div className="hidden flex-col gap-4 text-primary md:flex">test</div>
      </div>
    </article>
  );
}
