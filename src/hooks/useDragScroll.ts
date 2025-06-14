
import { useState, useRef } from 'react';
import type { DragState, VelocityRef } from './useDragScroll/types';
import { createMouseHandlers } from './useDragScroll/mouseHandlers';
import { createTouchHandlers } from './useDragScroll/touchHandlers';
import { useGlobalEventHandlers } from './useDragScroll/globalEventHandlers';

export const useDragScroll = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<DragState>({ 
    x: 0, 
    scrollLeft: 0, 
    startTime: 0, 
    virtualPosition: 0 
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef<VelocityRef>({ 
    x: 0, 
    lastX: 0, 
    lastTime: 0, 
    virtualVelocity: 0 
  });
  const animationRef = useRef<number>();

  const mouseHandlers = createMouseHandlers(
    containerRef,
    isDragging,
    setIsDragging,
    dragStart,
    setDragStart,
    velocityRef,
    animationRef
  );

  const touchHandlers = createTouchHandlers(
    containerRef,
    isDragging,
    setIsDragging,
    dragStart,
    setDragStart,
    velocityRef,
    animationRef
  );

  useGlobalEventHandlers(
    isDragging,
    dragStart,
    containerRef,
    setIsDragging,
    velocityRef,
    animationRef
  );

  return {
    containerRef,
    isDragging,
    handleMouseDown: mouseHandlers.handleMouseDown,
    handleMouseMove: mouseHandlers.handleMouseMove,
    handleMouseUp: mouseHandlers.handleMouseUp,
    handleTouchStart: touchHandlers.handleTouchStart,
    handleTouchMove: touchHandlers.handleTouchMove,
    handleTouchEnd: touchHandlers.handleTouchEnd
  };
};
