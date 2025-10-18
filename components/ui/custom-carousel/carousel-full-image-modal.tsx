import { X } from "lucide-react";
import Image from "next/image";
import { CAROUSEL_LABELS } from "@/lib/constants/carousel.constants";
import { cn } from "@/lib/utils";
import { Button } from "../button";

type CarouselFullImageModalProps = {
  open: boolean;
  currentImage: string;
  nextImage: string;
  selectedIndex: number;
  totalImages: number;
  closeFullScreen: () => void;
};

export default function CarouselFullImageModal({
  open,
  currentImage,
  nextImage,
  selectedIndex,
  totalImages,
  closeFullScreen,
}: CarouselFullImageModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm",
        open ? "visible" : "invisible",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image view"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeFullScreen();
        }
      }}
      onClick={closeFullScreen}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-white/10 text-white hover:bg-white/20"
        onClick={closeFullScreen}
        aria-label="Close full screen view"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="relative h-[90vh] max-h-screen w-[90vw] max-w-screen">
        <Image
          src={currentImage}
          alt={`Car image ${selectedIndex + 1} - Full screen view`}
          fill
          priority
          sizes="90vw"
          quality={100}
          className="object-contain"
        />
      </div>

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
          className="object-contain"
          loading="eager"
        />
      </div>

      <div className="-translate-x-1/2 absolute bottom-8 left-1/2 rounded-full bg-black/50 px-6 py-2 font-bold text-lg text-white">
        {CAROUSEL_LABELS.COUNTER(selectedIndex, totalImages)}
      </div>
    </div>
  );
}
