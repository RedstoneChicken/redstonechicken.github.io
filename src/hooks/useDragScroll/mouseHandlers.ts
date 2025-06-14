import { RefObject } from 'react';

export const createMouseHandlers = (
  containerRef: RefObject<HTMLDivElement>,
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  dragStart: { x: number; scrollLeft: number; startTime: number; virtualPosition: number },
  setDragStart: (start: { x: number; scrollLeft: number; startTime: number; virtualPosition: number }) => void,
  velocityRef: RefObject<{ x: number; lastX: number; lastTime: number; virtualVelocity: number }>,
  animationRef: RefObject<number | undefined>
) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const container = containerRef.current;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      scrollLeft: container.scrollLeft,
      startTime: Date.now(),
      virtualPosition: container.scrollLeft
    });

    if (velocityRef.current) {
      velocityRef.current.x = 0;
      velocityRef.current.lastX = e.clientX;
      velocityRef.current.lastTime = Date.now();
      velocityRef.current.virtualVelocity = 0;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const container = containerRef.current;
    const deltaX = e.clientX - dragStart.x;
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
        velocityRef.current.x = (e.clientX - velocityRef.current.lastX) / timeDelta;
        velocityRef.current.lastX = e.clientX;
        velocityRef.current.lastTime = now;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
