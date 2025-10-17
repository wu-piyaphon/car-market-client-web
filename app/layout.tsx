import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ActionButton from "@/components/layout/action-button";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";

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
  title: "GoodCarMarket - ตลาดรถยนต์มือสองประเทศไทย",
  description:
    "ค้นหา ซื้อ และขายรถยนต์มือสองที่ GoodCarMarket แพลตฟอร์มตลาดรถมือสอง พร้อมบริการประเมินราคารถ คำนวณสินเชื่อ และระบบค้นหาเลือกจากรถยนต์หลายพันคันจากหลากหลายยี่ห้อ",
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
        <Toaster font={LINESeedSans.className} />
        <Footer />
      </body>
    </html>
  );
}
