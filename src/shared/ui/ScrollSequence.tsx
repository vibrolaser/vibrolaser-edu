"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ScrollSequence.module.css";

interface ScrollSequenceProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  height?: number;
  lerp?: number;
  cardSpacing?: number;
  endPadding?: number;
  // Extra vertical dwell when sequence starts/ends on desktop (px)
  desktopStartDwellPx?: number;
  desktopEndDwellPx?: number;
  // Extra vertical dwell while each card is centered on mobile (px per card)
  mobileCardDwellPx?: number;
}

export function ScrollSequence<T>({
  items,
  renderItem,
  height = 480,
  lerp = 0.15,
  cardSpacing = 100,
  endPadding = 3000,
  desktopStartDwellPx = 200,
  desktopEndDwellPx = 4000,
  mobileCardDwellPx = 200,
}: ScrollSequenceProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [containerHeightPx, setContainerHeightPx] = useState<number | null>(
    null
  );
  const verticalRangeRef = useRef(1);
  const centeredTranslateXsRef = useRef<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const mobilePathLengthRef = useRef(0);
  const dwellStartFracRef = useRef(0);
  const dwellEndFracRef = useRef(0);
  const mobilePlateauFracRef = useRef(0);

  const max = items.length;

  const progressToIndex = useMemo(() => {
    if (max <= 0) return 0;
    const idx = Math.floor(progress * max + 0.00001);
    return Math.min(max - 1, Math.max(0, idx));
  }, [progress, max]);

  const clamp = (v: number, min: number, maxV: number) =>
    Math.max(min, Math.min(maxV, v));

  // Track viewport breakpoint for mobile-only snapping
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();
    mql.addEventListener("change", updateIsMobile);
    return () => mql.removeEventListener("change", updateIsMobile);
  }, []);

  // Recalculate container height and vertical scroll range based on horizontal content
  useEffect(() => {
    const recalc = () => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const totalWidth = track.scrollWidth;
      const viewportWidth = sticky.clientWidth;
      const stickyHeight = sticky.clientHeight;
      const maxTranslate = Math.max(0, totalWidth - viewportWidth);

      // Precompute centered translateX per card so that each card aligns to the viewport center
      const cards = Array.from(track.children) as HTMLElement[];
      const viewportCenter = viewportWidth / 2;
      const translateXs: number[] = cards.map((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const desired = viewportCenter - cardCenter;
        // Clamp into the available translate range [ -maxTranslate, 0 ]
        return Math.max(-maxTranslate, Math.min(0, desired));
      });
      centeredTranslateXsRef.current = translateXs;

      // Compute actual mobile path length between first and last centered positions
      const firstCenter = translateXs.length > 0 ? translateXs[0] : 0;
      const lastCenter =
        translateXs.length > 0 ? translateXs[translateXs.length - 1] : 0;
      mobilePathLengthRef.current = Math.abs(lastCenter - firstCenter);

      // Use appropriate horizontal path length depending on breakpoint
      const horizontalPathLength = isMobile
        ? mobilePathLengthRef.current
        : maxTranslate;

      // Add dwell pixels depending on breakpoint
      const desktopDwellPx = isMobile
        ? 0
        : desktopStartDwellPx + desktopEndDwellPx;
      const mobileDwellPx = isMobile
        ? Math.max(0, items.length) * mobileCardDwellPx
        : 0;

      const computedContainerHeight =
        stickyHeight +
        horizontalPathLength +
        endPadding +
        desktopDwellPx +
        mobileDwellPx;
      setContainerHeightPx(computedContainerHeight);

      const viewportHeight = window.innerHeight;
      verticalRangeRef.current = Math.max(
        1,
        computedContainerHeight - viewportHeight
      );

      // Pre-compute fractions of progress reserved for dwells (based on pixels)
      const denom = verticalRangeRef.current || 1;
      dwellStartFracRef.current = Math.max(0, desktopStartDwellPx / denom);
      dwellEndFracRef.current = Math.max(0, desktopEndDwellPx / denom);
      // For mobile, plateau width around each center
      mobilePlateauFracRef.current = Math.max(0, mobileCardDwellPx / denom);
    };

    recalc();

    const handleResize = () => recalc();
    window.addEventListener("resize", handleResize, { passive: true } as any);

    const track = trackRef.current;
    const sticky = stickyRef.current;
    const roTrack = track ? new ResizeObserver(() => recalc()) : null;
    const roSticky = sticky ? new ResizeObserver(() => recalc()) : null;
    roTrack?.observe(track as Element);
    roSticky?.observe(sticky as Element);

    return () => {
      window.removeEventListener("resize", handleResize as any);
      roTrack?.disconnect();
      roSticky?.disconnect();
    };
  }, [
    endPadding,
    isMobile,
    max,
    desktopStartDwellPx,
    desktopEndDwellPx,
    mobileCardDwellPx,
    items.length,
  ]);

  // Enhanced scroll progress calculation with dynamic vertical range
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateProgress = () => {
      const rect = container.getBoundingClientRect();
      const headerHeight =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height"
          )
        ) || 80;

      const denom = verticalRangeRef.current;
      const raw = (-rect.top + headerHeight) / denom;
      const scrollProgress = clamp(raw, 0, 1);

      targetProgressRef.current = scrollProgress;
      setProgress(scrollProgress);

      // Для desktop оставляем старую логику активной карточки от прогресса
      if (!isMobile) {
        const cardIndex = Math.floor(scrollProgress * max);
        if (cardIndex !== activeCardIndex) {
          setActiveCardIndex(Math.min(max - 1, Math.max(0, cardIndex)));
        }
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [max, cardSpacing, activeCardIndex, endPadding, isMobile]);

  // Apply enhanced transform with center-snapping between cards and smooth reveal
  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const container = containerRef.current;
    if (!track || !sticky || !container) return;

    const centers = centeredTranslateXsRef.current;
    const cardsCount = max;
    const totalWidth = track.scrollWidth;
    const viewportWidth = sticky.clientWidth;
    const maxTranslate = Math.max(0, totalWidth - viewportWidth);

    // Helper easing for segment interpolation only (keeps exact positions at segment ends)
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let translateX = 0;
    if (isMobile) {
      if (cardsCount <= 1) {
        translateX = centers[0] ?? 0;
      } else {
        // Segment between card centers in progress units
        const segment = 1 / (cardsCount - 1);
        const plateau = Math.min(segment * 0.8, mobilePlateauFracRef.current); // do not exceed most of segment
        const halfPlateau = plateau / 2;

        // Find nearest segment
        const rawIndex = progress / segment;
        const baseLeft = Math.max(
          0,
          Math.min(cardsCount - 2, Math.floor(rawIndex))
        );
        const leftCenter = baseLeft * segment;
        const rightCenter = (baseLeft + 1) * segment;

        let mappedX = 0;
        let newActive = activeCardIndex;

        // Left and right plateau boundaries
        const leftPlateauStart = Math.max(0, leftCenter - halfPlateau);
        const leftPlateauEnd = Math.min(1, leftCenter + halfPlateau);
        const rightPlateauStart = Math.max(0, rightCenter - halfPlateau);
        const rightPlateauEnd = Math.min(1, rightCenter + halfPlateau);

        if (progress <= leftPlateauEnd) {
          // Stick to left center while within/just before plateau
          mappedX = centers[baseLeft] ?? 0;
          newActive = baseLeft;
        } else if (progress >= rightPlateauStart) {
          // Stick to right center while within/after plateau
          mappedX = centers[baseLeft + 1] ?? 0;
          newActive = baseLeft + 1;
        } else {
          // Transition zone between plateaus
          const zoneStart = leftPlateauEnd;
          const zoneEnd = rightPlateauStart;
          const zoneT = Math.max(
            0,
            Math.min(
              1,
              (progress - zoneStart) / Math.max(1e-6, zoneEnd - zoneStart)
            )
          );
          const t = easeInOutCubic(zoneT);
          const x0 = centers[baseLeft] ?? 0;
          const x1 = centers[baseLeft + 1] ?? 0;
          mappedX = x0 * (1 - t) + x1 * t;
          newActive = zoneT < 0.5 ? baseLeft : baseLeft + 1;
        }

        translateX = mappedX;
        if (newActive !== activeCardIndex) setActiveCardIndex(newActive);
      }
    } else {
      // Desktop: add dwell periods at start and end based on pixel fractions
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const startFrac = dwellStartFracRef.current;
      const endFrac = dwellEndFracRef.current;
      const middleDenom = Math.max(1e-6, 1 - startFrac - endFrac);

      let mapped = 0;
      if (progress <= startFrac) {
        mapped = 0;
      } else if (progress >= 1 - endFrac) {
        mapped = 1;
      } else {
        mapped = (progress - startFrac) / middleDenom;
      }
      const easedProgress = easeOutCubic(mapped);
      translateX = -easedProgress * maxTranslate;
      // activeCardIndex managed by scroll progress effect for desktop
    }

    track.style.transform = `translateX(${translateX}px)`;

    // Плавная анимация карточек без миганий
    const cards = Array.from(track.children) as HTMLElement[];
    const cardsCountSafe = Math.max(cards.length, 1);

    cards.forEach((card, idx) => {
      const cardElement = card as HTMLElement;
      let opacity = 1;
      let scale = 1;
      let translateY = 0;
      let blur = 0;

      if (isMobile) {
        // Mobile: closeness to center drives emphasis
        const segment = cardsCountSafe > 1 ? 1 / (cardsCountSafe - 1) : 1;
        const cardCenterProgress = cardsCountSafe > 1 ? idx * segment : 0;
        const halfSegment = segment / 2;
        const distance = Math.abs(progress - cardCenterProgress);
        const closeness = Math.max(0, Math.min(1, 1 - distance / halfSegment));

        opacity = 0.3 + 0.7 * closeness;
        scale = 0.95 + 0.05 * closeness;
        translateY = 60 - 60 * closeness;
        blur = 2 - 2 * closeness;
      } else {
        // Desktop: original flowing reveal by card index
        const cardProgress = Math.max(
          0,
          Math.min(1, (progress * max - idx + 0.2) / 0.6)
        );
        opacity = Math.min(1, cardProgress * 1.5);
        scale = 0.95 + cardProgress * 0.05;
        translateY = 60 - cardProgress * 60;
        blur = 2 - cardProgress * 2;
      }

      // Применяем стили напрямую для плавности
      cardElement.style.opacity = opacity.toString();
      cardElement.style.transform = `translateY(${translateY}px) scale(${scale})`;
      cardElement.style.filter = `blur(${blur}px)`;

      // Добавляем активное состояние только для текущей карточки
      if (idx === activeCardIndex) {
        cardElement.classList.add(styles.sequence__card__active);
      } else {
        cardElement.classList.remove(styles.sequence__card__active);
      }
    });

    (sticky.style as any).setProperty?.("--progress", String(progress));
  }, [progress, activeCardIndex, max, cardSpacing, endPadding]);

  return (
    <div
      ref={containerRef}
      className={styles.sequence}
      style={{
        height: containerHeightPx ? `${containerHeightPx}px` : `${height}vh`,
      }}
    >
      <div
        ref={stickyRef}
        className={styles.sequence__sticky}
        role="group"
        aria-roledescription="scroll sequence"
      >
        <div ref={trackRef} className={styles.sequence__track}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={styles.sequence__card}
              data-card-index={idx}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
