"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider = ({
  children,
}: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Настройки для работы со sticky элементами
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Важно: отключаем infinite для sticky
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      (window as any).__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
