
import type { ProjectVideo } from '@/hooks/useProjectVideos';

interface VideoMainPlayerProps {
  video: ProjectVideo;
  selectedVideo: number;
}

const VideoMainPlayer = ({ video, selectedVideo }: VideoMainPlayerProps) => {
  return (
    <div className="relative group">
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <iframe 
          key={`main-${selectedVideo}`} 
          src={`https://www.youtube.com/embed/${video.video_id}?rel=0&enablejsapi=1`} 
          title={video.title} 
          className="w-full h-full" 
          allowFullScreen 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        />
      </div>
    </div>
  );
};

export default VideoMainPlayer;
