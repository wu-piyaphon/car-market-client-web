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
      <Container className="hidden w-full py-6 md:flex">
        <div className="hidden grid-cols-3 items-center justify-between md:grid">
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
