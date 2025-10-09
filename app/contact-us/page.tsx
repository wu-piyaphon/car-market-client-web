import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-us";
import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | ติดต่อเรา`,
};

// ----------------------------------------------------------------------

export default function Page() {
  return <ContactSection />;
}
