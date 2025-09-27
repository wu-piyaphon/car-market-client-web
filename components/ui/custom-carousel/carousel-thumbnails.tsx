import Image from "next/image";
import type { RefObject } from "react";
import { CAROUSEL_LABELS } from "@/lib/constants/carousel.constants";
import { cn } from "@/lib/utils";

type CarouselThumbnailsProps = {
  images: string[];
  selectedIndex: number;
  thumbnailsRef: RefObject<HTMLDivElement | null>;
  onThumbnailClick: (index: number) => void;
};

export function CarouselThumbnails({
  images,
  selectedIndex,
  thumbnailsRef,
  onThumbnailClick,
}: CarouselThumbnailsProps) {
  if (images.length <= 1) {
    return null;
  }

  return (
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
            onClick={() => onThumbnailClick(index)}
            className={cn(
              "relative aspect-square h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg outline-2 transition-all duration-200",
              selectedIndex === index
                ? "outline-blue-500"
                : "outline-gray-200 hover:outline-gray-300",
            )}
            aria-label={CAROUSEL_LABELS.THUMBNAIL(index)}
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
  );
}
