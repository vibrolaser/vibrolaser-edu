import { useInView as useInViewOriginal, IntersectionOptions } from "react-intersection-observer";

export const useInView = (options?: IntersectionOptions) => {
  return useInViewOriginal(options);
};

export type { IntersectionOptions };
