import type { Metadata } from "next";
import Container from "@/components/layout/container";
import AboutUsFAQ from "@/components/sections/about-us/about-us-faq";
import AboutUsHeader from "@/components/sections/about-us/about-us-header";
import AboutUsImages from "@/components/sections/about-us/about-us-images";
import { CONFIG } from "@/global-config";

export const metadata: Metadata = {
  title: `${CONFIG.appName} | เกี่ยวกับเรา`,
  description:
    "เกี่ยวกับ GoodCarMarket ตลาดรถยนต์มือสองชั้นนำของประเทศไทย พร้อมบริการซื้อขายรถยนต์มือสองคุณภาพ ประเมินราคารถ และสินเชื่อรถยนต์",
  openGraph: {
    title: `${CONFIG.appName} | เกี่ยวกับเรา`,
    description:
      "เกี่ยวกับ GoodCarMarket ตลาดรถยนต์มือสองชั้นนำของประเทศไทย พร้อมบริการซื้อขายรถยนต์มือสองคุณภาพ ประเมินราคารถ และสินเชื่อรถยนต์",
    images: [
      {
        url: "/images/about-us/img-middle.webp",
        width: 800,
        height: 800,
        alt: "บรรยากาศภายใน GoodCarMarket ตลาดรถยนต์มือสอง",
      },
    ],
  },
};

export default function Page() {
  return (
    <Container className="my-5 flex flex-col md:my-15 md:gap-24 lg:my-18 lg:gap-30">
      <AboutUsHeader />
      <AboutUsImages />
      <AboutUsFAQ />
    </Container>
  );
}
