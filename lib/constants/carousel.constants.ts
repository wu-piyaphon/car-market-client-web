// Carousel constants
export const CAROUSEL_CONSTANTS = {
  OPACITY: {
    BUTTON_DEFAULT: "opacity-0",
    BUTTON_HOVER: "opacity-100",
    THUMBNAIL_SELECTED: "opacity-100",
    THUMBNAIL_UNSELECTED: "opacity-70",
    THUMBNAIL_HOVER: "opacity-90",
  },
  BACKGROUND: {
    BUTTON: "bg-white/80",
    BUTTON_HOVER: "bg-white/90",
    COUNTER: "bg-black/50",
  },
  TRANSITIONS: {
    DURATION: "duration-200",
    DEFAULT: "transition-all duration-200",
    OPACITY: "transition-opacity duration-200",
  },
  SPACING: {
    THUMBNAIL_GAP_MOBILE: "gap-3",
    THUMBNAIL_GAP_DESKTOP: "md:gap-5",
    CAROUSEL_GAP_MOBILE: "gap-5",
    CAROUSEL_GAP_DESKTOP: "lg:gap-7",
  },
  SIZING: {
    ICON: "h-5 w-5",
    MIN_HEIGHT: "min-h-100 md:min-h-0",
  },
} as const;

// Accessibility labels
export const CAROUSEL_LABELS = {
  MAIN_IMAGE: (current: number, total: number) =>
    `Car image ${current + 1} of ${total}`,
  THUMBNAIL: (index: number) => `Select image ${index + 1}`,
  PREVIOUS_BUTTON: "Previous image",
  NEXT_BUTTON: "Next image",
  COUNTER: (current: number, total: number) => `${current + 1} / ${total}`,
} as const;
