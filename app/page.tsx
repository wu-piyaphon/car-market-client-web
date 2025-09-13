import Container from "@/components/layout/container";
import HomeAboutUs from "@/components/sections/home/home-about-us";
import HomeCarList from "@/components/sections/home/home-car-list";
import HomeCarTabs from "@/components/sections/home/home-car-tabs";
import HomeFacebookCover from "@/components/sections/home/home-facebook-cover";
import HomeSearchCard from "@/components/sections/home/home-search-card";
import HomeSellingSection from "@/components/sections/home/home-selling-section";
import CarImageBanner from "@/components/ui/custom-banner/car-image-banner";

export default function Home() {
  return (
    <>
      <Container className="block md:hidden">
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">“GoodCarMarket”</span>
        </h1>
      </Container>

      <CarImageBanner />

      <HomeSearchCard />

      <Container className="mt-18 hidden flex-row gap-4 md:flex lg:gap-9">
        <HomeCarList />
        <HomeFacebookCover />
      </Container>

      <HomeCarTabs />

      <HomeSellingSection />

      <HomeAboutUs />
    </>
  );
}
