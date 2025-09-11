import Image from "next/image";
import Container from "@/components/layout/container";
import HomeAboutUs from "@/components/sections/home/home-about-us";
import HomeCarList from "@/components/sections/home/home-car-list";
import HomeCarTabs from "@/components/sections/home/home-car-tabs";
import HomeFacebookCover from "@/components/sections/home/home-facebook-cover";
import HomeSearchCard from "@/components/sections/home/home-search-card";
import HomeSellingSection from "@/components/sections/home/home-selling-section";

export default function Home() {
  return (
    <>
      <Container className="block md:hidden">
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">“GoodCarMarket”</span>
        </h1>
      </Container>

      <Image
        src="/images/home/hero.png"
        alt="Hero Image"
        width={2560}
        height={1440}
        quality={100}
        className="h-[230px] w-screen object-cover object-bottom md:h-[400px] md:object-[50%_75%] lg:h-[560]"
      />

      <HomeSearchCard />

      <Container className="mt-18 hidden flex-row gap-4 md:flex lg:gap-9">
        <HomeCarList />
        <HomeFacebookCover />
      </Container>

      <Container className="mt-8 flex flex-col md:hidden">
        <HomeCarTabs />
      </Container>

      <Container className="mt-10">
        <HomeSellingSection />
      </Container>

      <Container className="mt-10">
        <HomeAboutUs />
      </Container>
    </>
  );
}
