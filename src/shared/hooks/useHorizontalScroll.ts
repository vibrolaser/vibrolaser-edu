import { useEffect, useRef, useCallback } from "react";

interface UseHorizontalScrollOptions {
  threshold?: number;
  rootMargin?: string;
  horizontalDuration?: number;
  verticalDuration?: number;
}

export const useHorizontalScroll = (
  options: UseHorizontalScrollOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px",
    horizontalDuration = 1.5,
    verticalDuration = 1.2,
  } = options;

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLElement | null>(null);
  const isHorizontalMode = useRef(false);

  const registerSection = useCallback((element: HTMLElement | null) => {
    sectionRef.current = element;
  }, []);

  const registerCardsContainer = useCallback((element: HTMLElement | null) => {
    cardsContainerRef.current = element;
  }, []);

  const switchToHorizontalScroll = useCallback(() => {
    if (!cardsContainerRef.current) return;

    isHorizontalMode.current = true;

    // Добавляем класс для горизонтального скролла
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = "translateX(0)";
      cardsContainerRef.current.style.transition = `transform ${horizontalDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }

    // Анимация появления карточек слева направо
    const cards = cardsContainerRef.current?.querySelectorAll("[data-card]");
    if (cards) {
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        cardElement.style.opacity = "0";
        cardElement.style.transform = "translateX(-100px)";

        setTimeout(() => {
          cardElement.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          cardElement.style.opacity = "1";
          cardElement.style.transform = "translateX(0)";
        }, index * 150);
      });
    }
  }, [horizontalDuration]);

  const switchToVerticalScroll = useCallback(() => {
    if (!cardsContainerRef.current) return;

    isHorizontalMode.current = false;

    // Анимация возврата карточек в нормальное положение
    const cards = cardsContainerRef.current?.querySelectorAll("[data-card]");
    if (cards) {
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        cardElement.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        cardElement.style.transform = "translateY(0)";
        cardElement.style.opacity = "1";
      });
    }
  }, [verticalDuration]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isHorizontalMode.current) {
            // Переключаемся в горизонтальный режим при появлении секции
            switchToHorizontalScroll();
          } else if (!entry.isIntersecting && isHorizontalMode.current) {
            // Возвращаемся в вертикальный режим при выходе из секции
            switchToVerticalScroll();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, switchToHorizontalScroll, switchToVerticalScroll]);

  return { registerSection, registerCardsContainer };
};
