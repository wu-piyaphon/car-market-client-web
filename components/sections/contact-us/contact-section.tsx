"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { SvgIcon } from "@/components/icons";
import Container from "@/components/layout/container";
import { useCarousel } from "@/hooks/use-carousel";
import { CONTACT_LOCATIONS } from "./contact-data";
import ContactItem from "./contact-item";

export default function ContactSection() {
  const { selectedIndex, goToIndex } = useCarousel({
    totalImages: CONTACT_LOCATIONS.length,
    autoPlay: true,
    autoPlayInterval: 4000,
  });

  const currentLocation = CONTACT_LOCATIONS[selectedIndex];

  const handleDotClick = (index: number) => {
    goToIndex(index);
  };

  return (
    <Container className="py-4">
      {/* -- Header -- */}
      <div className="px-6 py-4 text-center">
        <h1 className="mb-2 font-bold text-5xl text-primary">ติดต่อเรา</h1>
      </div>

      {/* -- Image Carousel -- */}
      <div className="relative mx-6 mb-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
          {/* -- Main Image -- */}
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
            <div className="rounded-lg bg-blue-400/60 p-8">
              <svg
                className="h-16 w-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Location placeholder</title>
                <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6zM5 16l1.52-2.03L8.04 16H5z" />
              </svg>
            </div>
          </div>

          {/* -- Image placeholder for actual images -- */}
          {/* 
            <Image
              src={currentLocation.image}
              alt={currentLocation.name}
              fill
              className="object-cover"
            />
            */}
        </div>

        {/* -- Carousel Dots -- */}
        <div className="-translate-x-1/2 absolute bottom-4 left-1/2 mt-4 flex justify-center space-x-2 md:bottom-5 md:space-x-5 lg:bottom-8">
          {CONTACT_LOCATIONS.map((location, index) => (
            <button
              key={location.id}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === selectedIndex ? "bg-gray-700" : "bg-gray-300"
              }`}
              aria-label={`Go to location ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="my-10 px-6">
        <h2 className="mb-4 font-bold text-9xl text-primary">
          {currentLocation.name}
        </h2>
        <div className="space-y-8 rounded-xl bg-[#FAFAFA] px-5 py-6">
          <ContactItem
            title="Location"
            value={currentLocation.address}
            icon={<MapPin className="h-5 w-5 flex-shrink-0" />}
          />

          <ContactItem
            title="โทรศัพท์"
            value={currentLocation.phone}
            icon={<Phone className="h-5 w-5 flex-shrink-0" />}
          />

          {/* -- Social Media -- */}
          <div className="space-y-4">
            {currentLocation.facebook && (
              <div className="flex items-center">
                <SvgIcon
                  name="facebookCircle"
                  className="mr-3 size-9 shrink-0"
                />
                <p className="text-slate-900 text-xl">
                  {currentLocation.facebook}
                </p>
              </div>
            )}

            {currentLocation.line && (
              <div className="flex items-center">
                <SvgIcon name="line" className="mr-3 size-9 shrink-0" />
                <p className="text-slate-900 text-xl">{currentLocation.line}</p>
              </div>
            )}
          </div>

          {/* -- Working Hours -- */}
          <ContactItem
            title="เวลาทำการ"
            value={currentLocation.hours}
            icon={<Clock className="h-5 w-5 flex-shrink-0" />}
          />
        </div>
      </div>
    </Container>
  );
}
