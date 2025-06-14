
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

const VideoPlayer = ({ videoId, title, thumbnail }: VideoPlayerProps) => {
  return (
    <div className="aspect-video relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      <img 
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 interactive-element"
        >
          <Play className="h-9 w-9 fill-white text-white ml-1" />
        </a>
      </div>
    </div>
  );
};

export default VideoPlayer;
