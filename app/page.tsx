import Image from "next/image";
import Container from "@/components/layout/container";
import HomeCarList from "@/components/sections/home/home-car-list";
import HomeCarTabs from "@/components/sections/home/home-car-tabs";
import HomeSearchCard from "@/components/sections/home/home-search-card";
import { CAR_LIST } from "@/mocks/mock-car";

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

      <Container className="hidden flex-row gap-4 pt-18 md:flex lg:gap-9">
        <div className="flex flex-1 flex-col gap-7 lg:gap-10">
          <HomeCarList title="รถเข้าใหม่" items={CAR_LIST} />
          <HomeCarList title="รถเก๋ง" items={CAR_LIST} />
          <HomeCarList title="รถกระบะ" items={CAR_LIST} />
          <HomeCarList title="รถ SUV" items={CAR_LIST} />
        </div>
        <div className="flex">
          <iframe
            title="GoodCarMarket Facebook Page"
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftaladrodrayong1&tabs=timeline&width=260&height=740&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="260"
            height="740"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="overflow-hidden border-none"
          />
        </div>
      </Container>

      <HomeCarTabs />
    </>
  );
}
