import Image from "next/image";
import Container from "@/components/layout/container";
import HomeSearchCard from "@/sections/home/home-search-card";

export default function Home() {
  return (
    <>
      <Container className="block md:hidden">
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">“GoodCarMarket”</span>
        </h1>
      </Container>

      <Image
        src="/images/hero.png"
        alt="Hero Image"
        width={2560}
        height={1440}
        quality={100}
        className="h-[230px] w-screen object-cover object-bottom md:h-[400px] md:object-[50%_75%] lg:h-[560]"
      />
      <HomeSearchCard />
    </>
  );
}
