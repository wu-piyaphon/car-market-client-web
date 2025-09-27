"use client";

import { useCarousel } from "@/hooks/use-carousel";
import type { CarDetail } from "@/types/car.types";
import { CarouselEmptyState } from "../../../ui/custom-carousel/carousel-empty-state";
import { CarouselMainImage } from "../../../ui/custom-carousel/carousel-main-image";
import { CarouselThumbnails } from "../../../ui/custom-carousel/carousel-thumbnails";

type CarDetailCarouselProps = {
  images: CarDetail["images"];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export default function CarDetailCarousel({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
}: CarDetailCarouselProps) {
  const { selectedIndex, thumbnailsRef, goToPrevious, goToNext, goToIndex } =
    useCarousel({
      totalImages: images?.length || 0,
      autoPlay,
      autoPlayInterval,
    });

  // Early return for empty images
  if (!images || images.length === 0) {
    return <CarouselEmptyState />;
  }

  const currentImage = images[selectedIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="flex min-h-100 flex-col gap-5 md:min-h-0 lg:gap-7">
      <CarouselMainImage
        currentImage={currentImage}
        selectedIndex={selectedIndex}
        totalImages={images.length}
        showNavigation={hasMultipleImages}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      <CarouselThumbnails
        images={images}
        selectedIndex={selectedIndex}
        thumbnailsRef={thumbnailsRef}
        onThumbnailClick={goToIndex}
      />
    </div>
  );
}
