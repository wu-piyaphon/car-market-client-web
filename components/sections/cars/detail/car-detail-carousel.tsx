"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarDetail } from "@/types/car.types";

type CarDetailCarouselProps = {
  images: CarDetail["images"];
};

export default function CarDetailCarousel({ images }: CarDetailCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const scrollToThumbnail = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handlePrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    scrollToThumbnail(index);
  };

  return (
    <div className="flex min-h-100 flex-col gap-5 md:min-h-0 lg:gap-7">
      {/* Main Image */}
      <div
        className="group relative aspect-video h-3/4 w-full overflow-hidden rounded-lg"
        role="img"
        aria-label={`Car image ${selectedIndex + 1} of ${images.length}`}
      >
        <Image
          src={images[selectedIndex]}
          alt={`Car image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={selectedIndex === 0}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="-translate-y-1/2 absolute top-1/2 left-4 bg-white/80 opacity-0 transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="-translate-y-1/2 absolute top-1/2 right-4 bg-white/80 opacity-0 transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="relative h-1/4">
          <div
            ref={thumbnailsRef}
            className="scrollbar-hide flex h-full gap-3 overflow-x-auto p-1 md:gap-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <button
                key={`thumbnail-${index}-${image.slice(-10)}`}
                type="button"
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative aspect-square h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg outline-2 transition-all duration-200",
                  selectedIndex === index
                    ? "outline-blue-500"
                    : "outline-gray-200 hover:outline-gray-300",
                )}
                aria-label={`Select image ${index + 1}`}
              >
                <Image
                  fill
                  src={image}
                  alt={`Car thumbnail ${index + 1}`}
                  className={cn(
                    "object-cover duration-200",
                    selectedIndex === index
                      ? "rounded-2xl opacity-100 md:p-2"
                      : "opacity-70 hover:opacity-90",
                  )}
                  sizes="300px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
