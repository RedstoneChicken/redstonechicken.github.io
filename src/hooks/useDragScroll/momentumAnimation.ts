
export const createMomentumAnimation = (
  container: HTMLDivElement,
  velocity: number,
  animationRef: React.MutableRefObject<number | undefined>
) => {
  const startPosition = container.scrollLeft;
  const targetPosition = Math.max(0, Math.min(
    startPosition + velocity * 200, // Reduced momentum factor
    container.scrollWidth - container.clientWidth
  ));
  
  const duration = Math.min(Math.abs(velocity) * 200, 500); // Max 500ms duration
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentPosition = startPosition + (targetPosition - startPosition) * easeOut;
    
    container.scrollLeft = currentPosition;
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = undefined;
    }
  };
  
  animationRef.current = requestAnimationFrame(animate);
};
