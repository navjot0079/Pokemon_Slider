import { useState, useEffect, useCallback, useRef } from 'react';
import pokemonData from '../data/pokemon';

export default function useSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const isPausedRef = useRef(false);
  const total = pokemonData.length;

  const startAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % total);
      }
    }, 5000);
  }, [total]);

  const resetAutoAdvance = useCallback(() => {
    isPausedRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 8000);
    startAutoAdvance();
  }, [startAutoAdvance]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
    resetAutoAdvance();
  }, [total, isTransitioning, resetAutoAdvance]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    resetAutoAdvance();
  }, [total, isTransitioning, resetAutoAdvance]);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning || index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      resetAutoAdvance();
    },
    [activeIndex, isTransitioning, resetAutoAdvance]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse wheel navigation (debounced)
  useEffect(() => {
    let wheelTimeout = null;
    let canWheel = true;

    const handleWheel = (e) => {
      if (!canWheel) return;
      if (Math.abs(e.deltaY) < 30) return;

      canWheel = false;
      if (e.deltaY > 0) goNext();
      else goPrev();

      wheelTimeout = setTimeout(() => {
        canWheel = true;
      }, 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [goNext, goPrev]);

  // Start auto-advance on mount
  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [startAutoAdvance]);

  // Transition lock
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return {
    activeIndex,
    direction,
    isTransitioning,
    activePokemon: pokemonData[activeIndex],
    total,
    goNext,
    goPrev,
    goTo,
  };
}
