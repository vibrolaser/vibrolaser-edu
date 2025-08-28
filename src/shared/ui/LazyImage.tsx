"use client";
import { useState, useRef, useEffect } from "react";
import { useInView } from "@/shared/hooks/useInView";
import styles from "./LazyImage.module.css";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  onLoad,
  onError,
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "50px",
  });

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!inView || imageSrc !== placeholder) return;

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      onError?.();
    };

    img.src = src;
  }, [inView, src, imageSrc, placeholder, onLoad, onError]);

  const imageClassName = `${styles.lazyImage} ${className} ${
    isLoaded ? styles.loaded : ""
  } ${hasError ? styles.error : ""}`;

  return (
    <div
      ref={ref}
      className={styles.lazyImageContainer}
      style={{ width, height }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={imageClassName}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && !hasError && (
        <div className={styles.placeholder}>
          <div className={styles.spinner} />
        </div>
      )}
      {hasError && (
        <div className={styles.errorPlaceholder}>
          <span>Ошибка загрузки</span>
        </div>
      )}
    </div>
  );
};
