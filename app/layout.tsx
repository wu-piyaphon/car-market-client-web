import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ActionButton from "@/components/layout/action-button";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { CONFIG } from "@/global-config";

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
  title: `${CONFIG.appName} - ตลาดรถยนต์มือสองประเทศไทย`,
  description:
    "ค้นหา ซื้อ และขายรถยนต์มือสองที่ GoodCarMarket แพลตฟอร์มตลาดรถมือสอง พร้อมบริการประเมินราคารถ คำนวณสินเชื่อ และระบบค้นหาเลือกจากรถยนต์หลายพันคันจากหลากหลายยี่ห้อ",
  applicationName: CONFIG.appName,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://goodcarmarket.com",
    siteName: CONFIG.appName,
    title: `${CONFIG.appName} - ตลาดรถยนต์มือสองประเทศไทย`,
    description:
      "ค้นหา ซื้อ และขายรถยนต์มือสองที่ GoodCarMarket แพลตฟอร์มตลาดรถมือสอง พร้อมบริการประเมินราคารถ คำนวณสินเชื่อ และระบบค้นหาเลือกจากรถยนต์หลายพันคันจากหลากหลายยี่ห้อ",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: `${CONFIG.appName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONFIG.appName} - ตลาดรถยนต์มือสองประเทศไทย`,
    description: "ค้นหา ซื้อ และขายรถยนต์มือสองที่ GoodCarMarket แพลตฟอร์มตลาดรถมือสอง",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      {
        url: "/icons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/icons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/icons/favicon-48x48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/icons/favicon-64x64.png",
        type: "image/png",
        sizes: "64x64",
      },
      {
        url: "/icons/favicon-128x128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        url: "/icons/favicon-256x256.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        url: "/icons/favicon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/icons/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
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
