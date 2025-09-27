export type CarouselImage = {
  src: string;
  alt?: string;
  id?: string;
};

export type CarouselState = {
  selectedIndex: number;
  totalImages: number;
  isAutoPlaying: boolean;
};

export type CarouselActions = {
  goToPrevious: () => void;
  goToNext: () => void;
  goToIndex: (index: number) => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
};

export type CarouselOptions = {
  totalImages: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableKeyboardNavigation?: boolean;
  loop?: boolean;
};

export type CarouselHookReturn = CarouselActions & {
  selectedIndex: number;
  thumbnailsRef: React.RefObject<HTMLDivElement | null>;
  scrollToThumbnail: (index: number) => void;
};
