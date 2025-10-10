import { useCallback, useEffect, useRef, useState } from "react";

export type UseCarouselOptions = {
  totalImages: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export function useCarousel({
  totalImages,
  autoPlay = false,
  autoPlayInterval = 3000,
}: UseCarouselOptions) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  const scrollToThumbnail = useCallback((index: number) => {
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
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : totalImages - 1;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  }, [selectedIndex, totalImages, scrollToThumbnail]);

  const goToNext = useCallback(() => {
    const newIndex = selectedIndex < totalImages - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  }, [selectedIndex, totalImages, scrollToThumbnail]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalImages) {
        setSelectedIndex(index);
        scrollToThumbnail(index);
      }
    },
    [totalImages, scrollToThumbnail],
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalImages <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalImages, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore keyboard events when user is focused on form elements
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Home":
          goToIndex(0);
          break;
        case "End":
          goToIndex(totalImages - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, goToIndex, totalImages]);

  return {
    selectedIndex,
    thumbnailsRef,
    goToPrevious,
    goToNext,
    goToIndex,
    scrollToThumbnail,
  };
}
