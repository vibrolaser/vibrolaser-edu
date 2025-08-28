import { useEffect, useRef, useState } from "react";

export const useLenis = () => {
  const [lenis, setLenis] = useState<any>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Check if Lenis is already available
    if ((window as any).__lenis) {
      setLenis((window as any).__lenis);
      lenisRef.current = (window as any).__lenis;
      return;
    }

    // Wait for Lenis to be available
    const checkLenis = () => {
      if ((window as any).__lenis) {
        setLenis((window as any).__lenis);
        lenisRef.current = (window as any).__lenis;
      } else {
        requestAnimationFrame(checkLenis);
      }
    };

    checkLenis();

    return () => {
      lenisRef.current = null;
    };
  }, []);

  return { lenis, lenisRef };
};
