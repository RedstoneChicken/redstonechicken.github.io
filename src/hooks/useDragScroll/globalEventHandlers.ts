
import { useEffect, RefObject } from 'react';
import { applyMomentumScroll } from './scrollUtils';

export const useGlobalEventHandlers = (
  isDragging: boolean,
  dragStart: { x: number; scrollLeft: number; startTime: number; virtualPosition: number },
  containerRef: RefObject<HTMLDivElement>,
  setIsDragging: (dragging: boolean) => void,
  velocityRef: RefObject<{ x: number; lastX: number; lastTime: number; virtualVelocity: number }>,
  animationRef: RefObject<number | undefined>
) => {
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const deltaX = e.clientX - dragStart.x;
      const newScrollLeft = Math.max(0, Math.min(
        dragStart.scrollLeft - deltaX,
        container.scrollWidth - container.clientWidth
      ));

      container.scrollLeft = newScrollLeft;

      // Update velocity
      if (velocityRef.current) {
        const now = Date.now();
        const timeDelta = now - velocityRef.current.lastTime;
        if (timeDelta > 0) {
          velocityRef.current.x = (e.clientX - velocityRef.current.lastX) / timeDelta;
          velocityRef.current.lastX = e.clientX;
          velocityRef.current.lastTime = now;
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);
      
      // Apply momentum scroll if there's sufficient velocity
      if (containerRef.current && velocityRef.current && Math.abs(velocityRef.current.x) > 0.5) {
        applyMomentumScroll(containerRef.current, velocityRef.current.x * 100);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const container = containerRef.current;
      const deltaX = touch.clientX - dragStart.x;
      const newScrollLeft = Math.max(0, Math.min(
        dragStart.scrollLeft - deltaX,
        container.scrollWidth - container.clientWidth
      ));

      container.scrollLeft = newScrollLeft;

      // Update velocity
      if (velocityRef.current) {
        const now = Date.now();
        const timeDelta = now - velocityRef.current.lastTime;
        if (timeDelta > 0) {
          velocityRef.current.x = (touch.clientX - velocityRef.current.lastX) / timeDelta;
          velocityRef.current.lastX = touch.clientX;
          velocityRef.current.lastTime = now;
        }
      }
    };

    const handleGlobalTouchEnd = () => {
      if (!isDragging) return;

      setIsDragging(false);
      
      // Apply momentum scroll if there's sufficient velocity
      if (containerRef.current && velocityRef.current && Math.abs(velocityRef.current.x) > 0.5) {
        applyMomentumScroll(containerRef.current, velocityRef.current.x * 100);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, dragStart, containerRef, setIsDragging, velocityRef, animationRef]);
};
