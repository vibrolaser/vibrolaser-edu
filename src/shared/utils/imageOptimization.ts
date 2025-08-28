export const generateImageSrcSet = (
  src: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(", ");
};

export const generateImageSizes = (
  breakpoints: { [key: string]: string } = {
    "(max-width: 640px)": "100vw",
    "(max-width: 768px)": "100vw",
    "(max-width: 1024px)": "80vw",
    "(max-width: 1280px)": "70vw",
    "(min-width: 1281px)": "60vw"
  }
): string => {
  return Object.entries(breakpoints)
    .map(([query, size]) => `${query} ${size}`)
    .join(", ");
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const createBlurHash = (imageData: ImageData): string => {
  // Simplified blur hash generation
  // In production, use a proper library like blurhash
  return "L5H2EC=PM+yV0g-mq.wG9c010J9I";
};

export const optimizeImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpeg" | "png";
  } = {}
): string => {
  const url = new URL(src, window.location.origin);
  
  if (options.width) url.searchParams.set("w", options.width.toString());
  if (options.height) url.searchParams.set("h", options.height.toString());
  if (options.quality) url.searchParams.set("q", options.quality.toString());
  if (options.format) url.searchParams.set("f", options.format);
  
  return url.toString();
};
