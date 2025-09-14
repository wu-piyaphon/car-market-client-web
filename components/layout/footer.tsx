import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { SvgIcon } from "../icons";
import Container from "./container";

// ----------------------------------------------------------------------

const FOOTER_ITEMS = [
  {
    name: "หน้าหลัก",
    href: paths.home,
  },
  {
    name: "เกี่ยวกับเรา",
    href: paths.aboutUs,
  },
  {
    name: "ติดต่อเรา",
    href: paths.contactUs,
  },
  {
    name: "คำถามที่พบบ่อย",
    href: paths.faq,
  },
];

const SOCIAL_MEDIA = [
  { name: "Facebook", href: "#", icon: <SvgIcon name="facebook" /> },
  { name: "Instagram", href: "#", icon: <SvgIcon name="instagram" /> },
  { name: "Twitter", href: "#", icon: <SvgIcon name="twitter" /> },
];

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="mt-8 md:mt-0">
      <Container className="hidden w-full py-6 md:flex">
        <div className="hidden grid-cols-3 items-center justify-between md:grid">
          {/* Logo */}
          <Link href={paths.home}>
            <Image
              src="/logo.svg"
              alt="GoodCarMarket Logo"
              width={120}
              height={40}
              className="h-auto md:w-[110px] lg:w-[150px]"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden justify-center gap-12 text-nowrap md:flex lg:gap-15">
            {FOOTER_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center justify-end space-x-4">
            {SOCIAL_MEDIA.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                className="h-7 w-7 text-primary"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* -- Mobile Footer -- */}
      <div className="flex flex-col md:hidden">
        <h3 className="px-5 pt-6 pb-3 font-bold text-3xl">GoodCarMarket</h3>
        {FOOTER_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-row justify-between border-b px-5 py-4 text-xl"
          >
            {item.name}
            <ChevronRight />
          </Link>
        ))}
        <div className="flex justify-center bg-primary py-2 text-base text-white">
          © GoodCarMarket
        </div>
      </div>
    </footer>
  );
}
