"use client";

import { useEffect, useState } from "react";

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: "mobile" | "tablet" | "desktop";
}

const BREAKPOINTS = {
  mobile: 768, // md breakpoint
  tablet: 1025, // lg breakpoint
} as const;

/**
 * Custom hook for responsive screen size detection
 * Uses ResizeObserver for better performance with fallback to window resize
 *
 * @returns Object containing boolean flags and current screen size
 */
export function useResponsive(): UseResponsiveReturn {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const getScreenSize = (): "mobile" | "tablet" | "desktop" => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.mobile) {
        return "mobile";
      }

      if (width < BREAKPOINTS.tablet) {
        return "tablet";
      }

      return "desktop";
    };

    const updateScreenSize = () => {
      const newSize = getScreenSize();
      setScreenSize((prevSize) => {
        // Only update if size actually changed to prevent unnecessary re-renders
        return prevSize !== newSize ? newSize : prevSize;
      });
    };

    // Set initial screen size
    updateScreenSize();

    // Use ResizeObserver if available (better performance)
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        updateScreenSize();
      });

      // Observe the document body for viewport changes
      resizeObserver.observe(document.body);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback to window resize event with throttling
      let timeoutId: NodeJS.Timeout;

      const throttledUpdate = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateScreenSize, 16); // ~60fps throttling
      };

      window.addEventListener("resize", throttledUpdate);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", throttledUpdate);
      };
    }
  }, []);

  return {
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
    screenSize,
  };
}
