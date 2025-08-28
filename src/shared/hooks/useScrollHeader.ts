import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollHeaderState {
  isScrolled: boolean;
  isVisible: boolean;
}

const SCROLL_THRESHOLD = 50;
const HIDE_THRESHOLD = 900;
const THROTTLE_DELAY = 16; // ~60fps

export const useScrollHeader = () => {
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    isVisible: true,
  });

  const lastScrollY = useRef(0);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (throttleTimeout.current) return;

    throttleTimeout.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > SCROLL_THRESHOLD;

      let isVisible = true;

      if (currentScrollY > HIDE_THRESHOLD) {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        isVisible = !isScrollingDown;
      }

      setState((prev) => {
        if (prev.isScrolled === isScrolled && prev.isVisible === isVisible) {
          return prev;
        }
        return { isScrolled, isVisible };
      });

      lastScrollY.current = currentScrollY;
      throttleTimeout.current = null;
    }, THROTTLE_DELAY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [handleScroll]);

  return state;
};
