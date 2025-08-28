import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px",
    staggerDelay = 0.1,
  } = options;

  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const registerCard = (index: number, element: HTMLElement | null) => {
    cardRefs.current[index] = element;
  };

  const animateCards = () => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Добавляем задержку для эффекта каскада
              setTimeout(() => {
                card.style.transform = "translateY(0)";
                card.style.opacity = "1";
              }, index * staggerDelay * 1000);

              observer.unobserve(card);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(card);
    });
  };

  useEffect(() => {
    animateCards();
  }, []);

  return { registerCard };
};
