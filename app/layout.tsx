import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ActionButton from "@/components/layout/action-button";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";

const LINESeedSans = localFont({
  src: [
    {
      path: "../public/fonts/LINESeedSansTH_W_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedSansTH_W_Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "GoodCarMarket - ตลาดรถยนต์ออนไลน์ประเทศไทย",
  description:
    "ค้นหา ซื้อ และขายรถยนต์มือสองที่ GoodCarMarket แพลตฟอร์มตลาดรถออนไลน์ประเทศไทย พร้อมบริการประเมินราคารถ คำนวณสินเชื่อ และระบบค้นหาเลือกจากรถยนต์หลายพันคันจากหลากหลายยี่ห้อ",
  openGraph: {
    images: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${LINESeedSans.className} relative grid min-h-screen grid-rows-[1fr_auto] antialiased`}
      >
        <Navbar />
        <main className="overflow-hidden pt-[70px] md:pt-[76px] lg:pt-[106px]">
          {children}
        </main>
        <ActionButton />
        <Footer />
      </body>
    </html>
  );
}
