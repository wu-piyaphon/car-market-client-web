import type { Metadata } from "next";
import ContactSection from "@/components/sections/contact-us/contact-section";
import ContactSectionMobile from "@/components/sections/contact-us/contact-section-mobile";
import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | ติดต่อเรา`,
  description:
    "ติดต่อ GoodCarMarket สาขาใกล้คุณ เปิดบริการทุกวัน พร้อมให้คำปรึกษาเรื่องซื้อขายรถยนต์มือสอง",
  openGraph: {
    title: `${CONFIG.appName} | ติดต่อเรา`,
    description:
      "ติดต่อ GoodCarMarket สาขาใกล้คุณ เปิดบริการทุกวัน พร้อมให้คำปรึกษาเรื่องซื้อขายรถยนต์มือสอง",
    images: [
      {
        url: "/images/contact/champ-location-1.webp",
        width: 800,
        height: 600,
        alt: "สาขา GoodCarMarket",
      },
    ],
  },
};

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <div>
      <div className="md:hidden">
        <ContactSectionMobile />
      </div>

      <div className="hidden md:block">
        <ContactSection />
      </div>
    </div>
  );
}
