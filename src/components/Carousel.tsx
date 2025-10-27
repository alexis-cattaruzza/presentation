// src/components/Carousel.tsx
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "./Icon";

interface CarouselProps {
  children: ReactNode[]; // chaque enfant = une slide
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
}

export default function Carousel({
  children,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 4000,
  className = "",
  onSlideChange,
}: CarouselProps) {
  const totalSlides = children.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(safeIndex);
    onSlideChange?.(safeIndex);
  };

  const prev = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  const next = () => goToSlide((currentSlide + 1) % totalSlides);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, totalSlides]);

  // autoPlay
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setCurrentSlide((s) => (s + 1) % totalSlides), autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, totalSlides]);

  // touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) next();
    else prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className={`w-full relative ${className}`} aria-roledescription="carousel">
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="w-full shrink-0 h-full"
              style={{ width: `${100 / totalSlides}%` }}
              aria-hidden={currentSlide !== i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} / ${totalSlides}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* arrows - hidden on mobile, positioned outside content on larger screens */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Précédent"
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full items-center justify-center shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: "var(--color-primary)", color: "white" }}
            type="button"
          >
            <Icon name="chevron-left" size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Suivant"
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full items-center justify-center shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: "var(--color-primary)", color: "white" }}
            type="button"
          >
            <Icon name="chevron-right" size={18} />
          </button>
        </>
      )}

      {/* dots */}
      {showDots && totalSlides > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 mb-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Aller à la slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-8" : "w-2"}`}
              style={{
                backgroundColor: currentSlide === idx ? "var(--color-primary)" : "var(--color-muted)",
                boxShadow: currentSlide === idx ? "0 0 8px rgba(0,0,0,0.12)" : "none",
              }}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
