"use client";
import { useEffect } from "react";

const setVars = () => {
  const root = document.documentElement;
  const vh = window.innerHeight * 0.01;
  // Modern viewport units if supported, else fallback to vh
  // We still expose all variables so CSS can choose the most appropriate
  root.style.setProperty("--vh", `${vh}px`);
  // Approximate small/large/dynamic viewport units
  // On most browsers dvh === vh when address bar hidden
  root.style.setProperty("--dvh", `${vh}px`);
  root.style.setProperty("--svh", `${vh}px`);
  root.style.setProperty("--lvh", `1vh`);
};

export const ViewportUnits = () => {
  useEffect(() => {
    const update = () => setVars();
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return null;
};
