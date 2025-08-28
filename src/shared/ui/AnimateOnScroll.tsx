"use client";
import { ReactNode, CSSProperties } from "react";
import { useInView } from "@/shared/hooks/useInView";
import styles from "./AnimateOnScroll.module.css";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn";
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
}

export const AnimateOnScroll = ({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = "0px",
  style,
}: AnimateOnScrollProps) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });

  const animationClassName = `${styles.animateOnScroll} ${styles[animation]} ${
    inView ? styles.animated : ""
  } ${className}`;

  const animationStyle: CSSProperties = {
    ...style,
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
  };

  return (
    <div ref={ref} className={animationClassName} style={animationStyle}>
      {children}
    </div>
  );
};
