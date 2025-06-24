
import React, { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const PerformanceOptimizedImage = memo(({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  onLoad,
  onError 
}: PerformanceOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-muted/20 animate-pulse"
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          "will-change-auto transform-gpu"
        )}
        style={{
          imageRendering: "crisp-edges",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)"
        }}
      />
    </div>
  );
});

PerformanceOptimizedImage.displayName = 'PerformanceOptimizedImage';

export default PerformanceOptimizedImage;
