
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoNavigationProps {
  selectedVideo: number;
  totalVideos: number;
  onNavigate: (direction: 'left' | 'right') => void;
}

const VideoNavigation = ({ selectedVideo, totalVideos, onNavigate }: VideoNavigationProps) => {
  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onNavigate('left')} 
        disabled={selectedVideo === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-border/40 hover:bg-background/95 disabled:opacity-30 transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onNavigate('right')} 
        disabled={selectedVideo === totalVideos - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-border/40 hover:bg-background/95 disabled:opacity-30 transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  );
};

export default VideoNavigation;
