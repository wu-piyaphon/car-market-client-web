"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SvgIcon } from "@/components/icons";
import Container from "@/components/layout/container";
import { useCarousel } from "@/hooks/use-carousel";
import { cn } from "@/lib/utils";
import { CONTACT_DATA } from "./contact-data";
import ContactItem from "./contact-item";

export default function ContactSection() {
  const { selectedIndex, goToIndex, goToPrevious, goToNext } = useCarousel({
    totalImages: CONTACT_DATA.length,
    autoPlay: true,
    autoPlayInterval: 3000,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(selectedIndex);

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && CONTACT_DATA.length > 1) {
      goToNext();
    }
    if (isRightSwipe && CONTACT_DATA.length > 1) {
      goToPrevious();
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag handlers for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd || !isDragging) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && CONTACT_DATA.length > 1) {
      goToNext();
    }
    if (isRightSwipe && CONTACT_DATA.length > 1) {
      goToPrevious();
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleDotClick = (index: number) => {
    goToIndex(index);
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
          <button
            type="button"
            aria-label="Swipe or click to navigate between locations"
            className={cn(
              "relative aspect-[4/3] h-full w-full touch-pan-y select-none overflow-hidden rounded-xl border-0 bg-gray-100 p-0",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            <Image
              src={currentLocation.image}
              alt={currentLocation.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-100 ease-in-out hover:opacity-80",
                "pointer-events-none", // Prevent image from interfering with drag events
                isTransitioning ? "opacity-0" : "opacity-100",
              )}
            />
          </button>

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
