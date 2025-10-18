import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CAROUSEL_LABELS } from "@/lib/constants/carousel.constants";
import { cn } from "@/lib/utils";
import CarouselFullImageModal from "./carousel-full-image-modal";

type CarouselMainImageProps = {
  currentImage: string;
  nextImage: string;
  selectedIndex: number;
  totalImages: number;
  showNavigation: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function CarouselMainImage({
  currentImage,
  nextImage,
  selectedIndex,
  totalImages,
  showNavigation,
  onPrevious,
  onNext,
}: CarouselMainImageProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = useCallback(() => setIsFullScreen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        closeFullScreen();
      }
    };

    if (isFullScreen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFullScreen, closeFullScreen]);

  return (
    <div
      className="group relative aspect-video h-3/4 w-full overflow-hidden md:rounded-lg"
      role="img"
      aria-label={CAROUSEL_LABELS.MAIN_IMAGE(selectedIndex, totalImages)}
    >
      <Image
        src={currentImage}
        alt={`Car image ${selectedIndex + 1}`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 80vw"
        className="cursor-pointer object-cover transition-transform hover:scale-105"
        onClick={openFullScreen}
      />

      {/* -- Prefetched Image -- */}
      <div
        style={{
          width: 1,
          height: 1,
          position: "absolute",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <Image
          src={nextImage}
          alt="Car image (prefetched)"
          width={1}
          height={1}
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "-translate-y-1/2 absolute top-1/2 left-4 bg-white/80 opacity-0 transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100",
            )}
            onClick={onPrevious}
            aria-label={CAROUSEL_LABELS.PREVIOUS_BUTTON}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "-translate-y-1/2 absolute top-1/2 right-4 bg-white/80 opacity-0 transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100",
            )}
            onClick={onNext}
            aria-label={CAROUSEL_LABELS.NEXT_BUTTON}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* -- Image Counter -- */}
      <div className="absolute right-4 bottom-4 rounded-full bg-black/50 px-4 py-1 font-bold text-base text-white md:text-lg">
        {CAROUSEL_LABELS.COUNTER(selectedIndex, totalImages)}
      </div>

      {/* -- Full Screen Modal -- */}
      {isFullScreen && (
        <CarouselFullImageModal
          nextImage={nextImage}
          totalImages={totalImages}
          selectedIndex={selectedIndex}
          currentImage={currentImage}
          closeFullScreen={closeFullScreen}
        />
      )}
    </div>
  );
}
