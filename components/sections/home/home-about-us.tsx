import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function HomeAboutUs() {
  return (
    <article className="mt-10 md:mt-13 lg:mt-18">
      {/* -- Mobile -- */}
      <Container>
        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex flex-col gap-4 text-primary">
            <h2 className="whitespace-pre-line font-bold text-4xl leading-snug">{`รู้จัก GoodCarMarket\nแล้วรึยัง?`}</h2>
            <p className="whitespace-pre-line text-base">
              {`Choose from thousands of vehicles from multiple\nbrands and buy online with Click & Drive, or visit\nus at one of our dealerships today.`}
            </p>
          </div>

          <div className="px-5">
            <Image
              src="/images/home/about-us.png"
              alt="About Us"
              width={800}
              height={400}
              className="h-[280px] w-full rounded-2xl object-cover"
            />
          </div>

          <Button size="lg">เกี่ยวกับเรา</Button>
        </div>
      </Container>

      {/* -- Tablet/Desktop -- */}
      <div className="relative hidden w-full md:flex md:h-[390px] lg:h-[540px]">
        <div
          className="absolute left-0 z-10 h-full w-[48%] bg-primary"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}
        />

        <Container className="z-20 mx-auto flex h-full w-full flex-col justify-center">
          <div className="flex w-[40%] flex-col gap-5 px-10">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="font-bold text-7xl lg:text-11xl">
                Good Car Market
              </h2>
              <p className="text-base lg:text-xl">
                Choose from thousands of vehicles from multiple brands and buy
                online with Click & Drive, or visit us at one of our dealerships
                today.
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="max-w-fit border-white bg-primary px-4 text-white hover:bg-white/20"
            >
              เกี่ยวกับเรา <MoveUpRight className="size-5" />
            </Button>
          </div>
        </Container>

        <Image
          src="/images/home/about-us.png"
          alt="About Us - Car Image"
          width={1200}
          height={800}
          className="absolute right-0 h-[390px] w-[70%] object-cover lg:h-[540px]"
          quality={100}
        />
      </div>
    </article>
  );
}
