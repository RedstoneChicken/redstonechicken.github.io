
import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsRef = useRef(60);

  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      
      if (delta >= 1000) {
        fpsRef.current = Math.round((frameCount.current * 1000) / delta);
        frameCount.current = 0;
        lastTime.current = now;
        
        // Log performance warnings
        if (fpsRef.current < 30) {
          console.warn(`Low FPS detected: ${fpsRef.current}`);
        }
      }
      
      frameCount.current++;
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return fpsRef.current;
};
