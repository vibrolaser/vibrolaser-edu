import { useState, useCallback, useEffect, useRef } from "react";

const ANIMATION_DURATION = 300;
const DESKTOP_BREAKPOINT = 1240;

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollPositionRef = useRef(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const preventScroll = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    document.body.classList.add("mobile-menu-open");
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
  }, []);

  const restoreScroll = useCallback(() => {
    document.body.classList.remove("mobile-menu-open");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPositionRef.current);
  }, []);

  const preventTouchScroll = useCallback(
    (e: TouchEvent) => {
      if (isOpen) {
        e.preventDefault();
      }
    },
    [isOpen]
  );

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpen((prev) => !prev);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [isAnimating]);

  const handleClose = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpen(false);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [isAnimating]);

  useEffect(() => {
    if (isOpen) {
      preventScroll();
      document.addEventListener("touchmove", preventTouchScroll, {
        passive: false,
      });
      document.addEventListener("touchstart", preventTouchScroll, {
        passive: false,
      });
    } else {
      restoreScroll();
      document.removeEventListener("touchmove", preventTouchScroll);
      document.removeEventListener("touchstart", preventTouchScroll);
    }

    return () => {
      if (isOpen) {
        restoreScroll();
        document.removeEventListener("touchmove", preventTouchScroll);
        document.removeEventListener("touchstart", preventTouchScroll);
      }
    };
  }, [isOpen, preventScroll, restoreScroll, preventTouchScroll]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    isAnimating,
    handleToggle,
    handleClose,
  };
};
