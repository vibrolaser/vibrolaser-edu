"use client";

import { ReactNode } from "react";
import { useInView, IntersectionOptions } from "@/shared/hooks/useInView";
import clsx from "clsx";
import styles from "./InViewStyle.module.css";

interface InViewStyleProps extends IntersectionOptions {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  initialClass?: string;
}

export const InViewStyle = ({
  children,
  className,
  animationClass,
  initialClass = styles.initial,
  ...props
}: InViewStyleProps) => {
  const { ref, inView } = useInView(props);
  
  const containerClassName = clsx(
    styles.inViewContainer,
    className,
    initialClass,
    inView && (animationClass || styles.animated)
  );
  
  return (
    <div ref={ref} className={containerClassName}>
      {children}
    </div>
  );
};
