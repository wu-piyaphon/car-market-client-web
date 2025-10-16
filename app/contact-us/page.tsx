import type { Metadata } from "next";
import ContactSection from "@/components/sections/contact-us/contact-section";
import ContactSectionMobile from "@/components/sections/contact-us/contact-section-mobile";
import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `${CONFIG.appName} | ติดต่อเรา`,
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
