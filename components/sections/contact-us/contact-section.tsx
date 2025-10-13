"use client";

import { ChevronLeft, ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SvgIcon } from "@/components/icons";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/hooks/use-carousel";
import { cn } from "@/lib/utils";
import { CONTACT_DATA } from "./contact-data";
import ContactItem from "./contact-item";

// ----------------------------------------------------------------------

export default function ContactSection() {
  const { selectedIndex, goToIndex, goToPrevious, goToNext } = useCarousel({
    totalImages: CONTACT_DATA.length,
    autoPlay: true,
    autoPlayInterval: 3000,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(selectedIndex);

  // Handle transition when selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== displayedIndex) {
      setIsTransitioning(true);

      // After fade out completes, change the image and fade back in
      const timer = setTimeout(() => {
        setDisplayedIndex(selectedIndex);
        setIsTransitioning(false);
      }, 250); // Half of the transition duration

      return () => clearTimeout(timer);
    }
  }, [selectedIndex, displayedIndex]);

  const currentLocation = CONTACT_DATA[displayedIndex];

  const handleDotClick = (index: number) => {
    goToIndex(index);
  };

  const handlePrevious = () => {
    goToPrevious();
  };

  const handleNext = () => {
    goToNext();
  };

  return (
    <Container className="py-4">
      {/* -- Header -- */}
      <div className="mb-2 px-6 py-4 text-center md:mb-4 md:px-0 md:text-left">
        <h1 className="font-bold text-5xl text-primary md:text-6xl lg:text-11xl">
          ติดต่อเรา
        </h1>
      </div>

      {/* -- Content Container -- */}
      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        {/* -- Image Carousel -- */}
        <div className="relative w-full">
          <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={currentLocation.image}
              alt={currentLocation.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300 ease-in-out",
                isTransitioning ? "opacity-0" : "opacity-100",
              )}
            />
          </div>

          {/* -- Navigation Buttons -- */}
          {CONTACT_DATA.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="-translate-y-1/2 absolute top-1/2 left-4 border-0 bg-white backdrop-blur-sm hover:bg-white/90"
                onClick={handlePrevious}
                aria-label="Previous location"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="-translate-y-1/2 absolute top-1/2 right-4 border-0 bg-white backdrop-blur-sm hover:bg-white/80"
                onClick={handleNext}
                aria-label="Next location"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* -- Carousel Dots -- */}
          <div className="-translate-x-1/2 absolute bottom-4 left-1/2 mt-4 flex justify-center space-x-2 md:bottom-5 md:space-x-5 lg:bottom-8">
            {CONTACT_DATA.map((location, index) => (
              <button
                key={location.id}
                type="button"
                onClick={() => handleDotClick(index)}
                className={cn(
                  "h-3 w-3 cursor-pointer rounded-full transition-colors duration-300",
                  index === selectedIndex ? "bg-primary" : "bg-gray-100",
                )}
                aria-label={`Go to location ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* -- Contact Details -- */}
        <div className="my-4 h-full md:my-8 lg:my-0 lg:w-[400px]">
          <h2 className="mb-4 font-bold text-5xl text-primary md:text-6xl lg:text-9xl">
            {currentLocation.name}
          </h2>
          <div className="h-fit space-y-8 rounded-xl bg-[#FAFAFA] px-5 py-6 md:h-full">
            <ContactItem
              title="ที่อยู่"
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
                <Link
                  href={currentLocation.facebookLink}
                  target="_blank"
                  className="flex items-center"
                >
                  <SvgIcon
                    name="facebookCircle"
                    className="mr-3 size-9 shrink-0"
                  />
                  <p className="text-slate-900 text-xl">
                    {currentLocation.facebook}
                  </p>
                </Link>
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
      </div>
    </Container>
  );
}
