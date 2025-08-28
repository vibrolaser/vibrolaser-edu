"use client";
import { useEffect, useRef } from "react";
import styles from "./ScrollProgressBar.module.css";

export const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = (window as any).__lenis;

    const set = (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      if (barRef.current) barRef.current.style.transform = `scaleX(${clamped})`;
    };

    if (lenis) {
      const onScroll = () => {
        const root = lenis.rootElement || document.documentElement;
        const scrollHeight = root.scrollHeight - window.innerHeight;
        const progress =
          scrollHeight > 0
            ? (lenis.scroll || window.scrollY || 0) / scrollHeight
            : 0;
        set(progress);
      };
      lenis.on?.("scroll", onScroll);
      onScroll();
      return () => lenis.off?.("scroll", onScroll);
    }

    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight =
        (document.documentElement.scrollHeight || 0) - window.innerHeight;
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      set(p);
      rafId = requestAnimationFrame(update);
    };

    let rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.progress} aria-hidden>
      <div ref={barRef} className={styles.bar} />
    </div>
  );
};
