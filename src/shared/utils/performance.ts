export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

export const requestIdleCallback = (
  callback: () => void,
  options?: { timeout: number }
): number => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return (window as any).requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(callback, 1);
};

export const cancelIdleCallback = (id: number): void => {
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === "development") {
      console.log(`${name} took ${end - start}ms`);
    }
    
    return result;
  }) as T;
};

export const createVirtualScroller = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(window.scrollY / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);
  
  return {
    startIndex,
    endIndex,
    visibleItems: items.slice(startIndex, endIndex),
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
  };
};

export const batchUpdate = <T>(
  updates: (() => T)[],
  batchSize: number = 10
): Promise<T[]> => {
  return new Promise((resolve) => {
    const results: T[] = [];
    let currentIndex = 0;
    
    const processBatch = () => {
      const batch = updates.slice(currentIndex, currentIndex + batchSize);
      currentIndex += batchSize;
      
      batch.forEach((update) => {
        try {
          results.push(update());
        } catch (error) {
          console.error("Error in batch update:", error);
        }
      });
      
      if (currentIndex < updates.length) {
        requestIdleCallback(processBatch);
      } else {
        resolve(results);
      }
    };
    
    processBatch();
  });
};

export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    return new IntersectionObserver(callback, options);
  }
  return null;
};
