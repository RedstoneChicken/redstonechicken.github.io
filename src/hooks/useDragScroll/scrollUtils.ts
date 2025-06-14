
export const getScrollBoundaries = (container: HTMLDivElement) => {
  const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
  
  return {
    min: 0,
    max: maxScroll,
    virtualMin: -100, // Allow some overscroll
    virtualMax: maxScroll + 100
  };
};

export const calculateScrollPosition = (
  clientX: number,
  dragStart: { x: number; scrollLeft: number },
  container: HTMLDivElement
) => {
  const deltaX = clientX - dragStart.x;
  const newScrollLeft = dragStart.scrollLeft - deltaX;
  
  // Apply the scroll position directly
  container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth));
  
  return container.scrollLeft;
};

export const applyMomentumScroll = (
  container: HTMLDivElement,
  velocity: number,
  duration: number = 300
) => {
  const startScroll = container.scrollLeft;
  const distance = velocity * 0.3; // Reduced momentum factor
  const endScroll = Math.max(0, Math.min(startScroll + distance, container.scrollWidth - container.clientWidth));
  
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentScroll = startScroll + (endScroll - startScroll) * easeOut;
    
    container.scrollLeft = currentScroll;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};
