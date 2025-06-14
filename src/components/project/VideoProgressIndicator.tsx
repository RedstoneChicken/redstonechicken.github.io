
import { cn } from '@/lib/utils';

interface VideoProgressIndicatorProps {
  selectedVideo: number;
  totalVideos: number;
  onVideoSelect: (index: number) => void;
}

const VideoProgressIndicator = ({ selectedVideo, totalVideos, onVideoSelect }: VideoProgressIndicatorProps) => {
  if (totalVideos <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {Array.from({ length: totalVideos }, (_, index) => (
        <button
          key={index}
          onClick={() => onVideoSelect(index)}
          className={cn(
            "transition-all duration-300 rounded-full border-2 border-primary/30",
            selectedVideo === index
              ? "w-8 h-3 bg-primary border-primary shadow-lg" // Expanded active state
              : "w-3 h-3 bg-primary/30 hover:bg-primary/50 hover:border-primary/50"
          )}
          aria-label={`Go to video ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default VideoProgressIndicator;
