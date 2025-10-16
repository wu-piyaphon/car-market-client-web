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

export default function ContactSection() {
  const { selectedIndex, goToPrevious, goToNext } = useCarousel({
    totalImages: CONTACT_DATA.length,
    autoPlay: true,
    autoPlayInterval: 8000,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(selectedIndex);

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

  const handlePrevious = () => {
    goToPrevious();
  };

  const handleNext = () => {
    goToNext();
  };

  return (
    <Container className="!pr-0 grid grid-cols-[40%_1fr] gap-6 lg:grid-cols-[32%_1fr]">
      <div
        className={cn(
          "!pb-0 mr-0 flex h-full max-h-[calc(100vh-76px-85px)] w-full flex-col space-y-8 pt-8 transition-opacity duration-300 ease-in-out lg:max-h-[calc(100vh-106px-98px)] lg:space-y-11 lg:pt-10",
          isTransitioning ? "opacity-0" : "opacity-100",
        )}
      >
        <h2 className="font-bold text-4xl text-primary lg:text-8xl">
          {currentLocation.name}
        </h2>

        <ContactItem
          title="ที่อยู่"
          value={currentLocation.address}
          icon={<MapPin className="size-7 flex-shrink-0 lg:size-8" />}
        />

        <ContactItem
          title="โทรศัพท์"
          value={currentLocation.phone}
          icon={<Phone className="size-7 flex-shrink-0 lg:size-8" />}
        />

        <div className="space-y-4">
          <Link
            href={currentLocation.facebookLink}
            target="_blank"
            className="flex items-center"
          >
            <SvgIcon
              name="facebookCircle"
              className="mr-3 size-7 shrink-0 lg:size-8"
            />
            <p className="text-slate-900 text-xl">{currentLocation.facebook}</p>
          </Link>
        </div>

        <ContactItem
          title="เวลาทำการ"
          value={currentLocation.hours}
          icon={<Clock className="size-7 flex-shrink-0 lg:size-8" />}
        />

        <div className="relative h-full w-full">
          <Image
            src={currentLocation.image}
            alt={currentLocation.name}
            fill
            className={cn(
              "rounded-lg object-cover",
              isTransitioning ? "opacity-0" : "opacity-100",
            )}
          />
        </div>
      </div>

      {/* -- Contact Map -- */}
      <div className="relative">
        <iframe
          src={currentLocation.googleMapLink}
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          title={currentLocation.name}
          className={cn(
            "h-[calc(100vh-76px-85px)] w-full rounded-bl-xl lg:h-[calc(100vh-106px-98px)]",
          )}
        ></iframe>

        <Button
          variant="outline"
          size="icon"
          className="-translate-y-1/2 absolute top-1/2 left-4 border-0 bg-white backdrop-blur-sm hover:bg-white/50"
          onClick={handlePrevious}
          aria-label="Previous location"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="-translate-y-1/2 absolute top-1/2 right-4 border-0 bg-white backdrop-blur-sm hover:bg-white/50"
          onClick={handleNext}
          aria-label="Next location"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  );
}
