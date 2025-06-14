import { RefObject } from 'react';

export const createTouchHandlers = (
  containerRef: RefObject<HTMLDivElement>,
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  dragStart: { x: number; scrollLeft: number; startTime: number; virtualPosition: number },
  setDragStart: (start: { x: number; scrollLeft: number; startTime: number; virtualPosition: number }) => void,
  velocityRef: RefObject<{ x: number; lastX: number; lastTime: number; virtualVelocity: number }>,
  animationRef: RefObject<number | undefined>
) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const container = containerRef.current;
    
    setIsDragging(true);
    setDragStart({
      x: touch.clientX,
      scrollLeft: container.scrollLeft,
      startTime: Date.now(),
      virtualPosition: container.scrollLeft
    });

    if (velocityRef.current) {
      velocityRef.current.x = 0;
      velocityRef.current.lastX = touch.clientX;
      velocityRef.current.lastTime = Date.now();
      velocityRef.current.virtualVelocity = 0;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length !== 1) return;

    e.preventDefault();
    const touch = e.touches[0];
    const container = containerRef.current;
    const deltaX = touch.clientX - dragStart.x;
    const newScrollLeft = Math.max(0, Math.min(
      dragStart.scrollLeft - deltaX,
      container.scrollWidth - container.clientWidth
    ));

    container.scrollLeft = newScrollLeft;

    // Update velocity properties
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

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
