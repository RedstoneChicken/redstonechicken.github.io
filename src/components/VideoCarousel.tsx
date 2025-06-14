
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import VideoPlayer from './VideoPlayer';
import VideoInfo from './VideoInfo';

interface MediaItem {
  title: string;
  description: string;
  thumbnail: string;
  type: "update" | "showcase" | "tutorial" | "image";
  videoId?: string;
  publishedAt?: string;
  viewCount?: number;
}

interface VideoCarouselProps {
  media: MediaItem[];
  onSelectMedia?: (index: number) => void;
  activeIndex?: number;
  showThumbnails?: boolean;
  className?: string;
}

const VideoCarousel = ({ 
  media, 
  onSelectMedia, 
  activeIndex = 0, 
  showThumbnails = true,
  className 
}: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  
  const videoMedia = media.filter(item => item.type !== 'image' && item.videoId);
  
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? videoMedia.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onSelectMedia?.(newIndex);
  }, [currentIndex, videoMedia.length, onSelectMedia]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === videoMedia.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onSelectMedia?.(newIndex);
  }, [currentIndex, videoMedia.length, onSelectMedia]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    onSelectMedia?.(index);
  };

  if (videoMedia.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center border border-border/30">
        <p className="text-muted-foreground font-montserrat">No videos available for this project</p>
      </div>
    );
  }

  const currentVideo = videoMedia[currentIndex];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Video Display */}
      <div className="relative group glass-panel rounded-xl overflow-hidden border border-border/30 hover-border-red">
        <VideoPlayer 
          videoId={currentVideo.videoId!}
          title={currentVideo.title}
          thumbnail={currentVideo.thumbnail}
        />
        
        {/* Navigation Arrows */}
        {videoMedia.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white border-0 interactive-element"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white border-0 interactive-element"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
        
        {/* Video Info Overlay */}
        <VideoInfo 
          title={currentVideo.title}
          description={currentVideo.description}
          publishedAt={currentVideo.publishedAt}
          viewCount={currentVideo.viewCount}
        />
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && videoMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {videoMedia.map((video, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "flex-shrink-0 video-tile aspect-video w-32 h-20 rounded-lg overflow-hidden transition-all duration-200 interactive-element hover-border-red border border-border/30",
                index === currentIndex 
                  ? "ring-2 ring-primary shadow-lg border-primary" 
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
