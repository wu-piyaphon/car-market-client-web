import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/lib/paths";
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

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <footer>
      <Container className="py-6 w-full hidden md:flex">
        <div className="hidden md:grid grid-cols-3 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={paths.home}>
              <Image
                src="/good-car-logo.svg"
                alt="Good Car Market"
                width={120}
                height={40}
                className="h-auto md:w-[110px] lg:w-[150px]"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex justify-center text-nowrap gap-12 lg:gap-15">
            {FOOTER_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-end items-center space-x-4">
            <Link href="#" aria-label="Facebook">
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={22}
                height={22}
              />
            </Link>
          </div>
        </div>
      </Container>

      {/* -- Mobile Footer -- */}

      <div className="flex flex-col md:hidden">
        <h3 className="text-3xl px-5 pt-6 pb-3 font-bold">GoodCarMarket</h3>
        {FOOTER_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="py-4 px-5 flex flex-row border-b justify-between text-xl"
          >
            {item.name}
            <ChevronRight />
          </Link>
        ))}
        <div className="flex justify-center text-base py-2 bg-primary text-white">
          © GoodCarMarket
        </div>
      </div>
    </footer>
  );
}
