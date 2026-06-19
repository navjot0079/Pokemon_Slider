import { useRef, useCallback } from 'react';

export default function useSwipe(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const onTouchStart = useCallback((e) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (Math.abs(distance) >= threshold) {
      if (distance > 0) onSwipeLeft();
      else onSwipeRight();
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
