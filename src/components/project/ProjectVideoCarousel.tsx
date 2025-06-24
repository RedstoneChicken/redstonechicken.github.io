
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ProjectVideo } from '@/hooks/useProjectVideos';
import VideoMainPlayer from './VideoMainPlayer';
import VideoNavigation from './VideoNavigation';
import VideoThumbnailItem from './VideoThumbnailItem';
import VideoProgressIndicator from './VideoProgressIndicator';

interface ProjectVideoCarouselProps {
  videos: ProjectVideo[];
}

const ProjectVideoCarousel = ({ videos }: ProjectVideoCarouselProps) => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number; y: number } | null>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: false,
    skipSnaps: false,
    startIndex: 0,
  });

  // Simplified drag detection
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragStartPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartPosition) {
      const deltaX = Math.abs(e.clientX - dragStartPosition.x);
      const deltaY = Math.abs(e.clientY - dragStartPosition.y);
      
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }
    }
  }, [dragStartPosition]);

  const handlePointerUp = useCallback(() => {
    setTimeout(() => {
      setIsDragging(false);
      setDragStartPosition(null);
    }, 100);
  }, []);

  // Handle video selection from clicks or navigation
  const handleVideoSelect = useCallback((index: number) => {
    if (!isDragging) {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedVideo(index);
      }
    }
  }, [emblaApi, isDragging]);

  // Handle arrow navigation
  const navigateVideo = useCallback((direction: 'left' | 'right') => {
    if (!emblaApi) return;
    
    const currentIndex = selectedVideo;
    let newIndex;
    
    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(videos.length - 1, currentIndex + 1);
    }
    
    if (newIndex !== currentIndex) {
      handleVideoSelect(newIndex);
    }
  }, [emblaApi, selectedVideo, videos.length, handleVideoSelect]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateVideo('left');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateVideo('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateVideo]);

  if (!videos || videos.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No videos available</p>
      </div>
    );
  }

  const mainVideo = videos[selectedVideo] || videos[0];

  return (
    <div className="space-y-6">
      {/* Main Video Display */}
      <VideoMainPlayer video={mainVideo} selectedVideo={selectedVideo} />

      {/* Simplified Thumbnail Carousel */}
      {videos.length > 1 && (
        <div className="relative">
          {/* Navigation Arrows */}
          <VideoNavigation 
            selectedVideo={selectedVideo}
            totalVideos={videos.length}
            onNavigate={navigateVideo}
          />

          {/* Embla Carousel Container - Centered alignment */}
          <div 
            className="overflow-hidden rounded-xl cursor-grab active:cursor-grabbing" 
            ref={emblaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="flex gap-3 md:gap-4 px-4 py-2">
              {videos.map((video, index) => (
                <div key={video.id} className="flex-none">
                  <VideoThumbnailItem
                    video={video}
                    index={index}
                    isSelected={selectedVideo === index}
                    onClick={handleVideoSelect}
                    isDragging={isDragging}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <VideoProgressIndicator
            selectedVideo={selectedVideo}
            totalVideos={videos.length}
            onVideoSelect={handleVideoSelect}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectVideoCarousel;
