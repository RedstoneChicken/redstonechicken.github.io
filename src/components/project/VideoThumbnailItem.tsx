
import React from 'react';
import type { ProjectVideo } from '@/hooks/useProjectVideos';

interface VideoThumbnailItemProps {
  video: ProjectVideo;
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
  isDragging: boolean;
}

const VideoThumbnailItem = ({ video, index, isSelected, onClick, isDragging }: VideoThumbnailItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only handle click if not dragging
    if (!isDragging) {
      onClick(index);
    }
  };

  return (
    <div 
      className={`
        relative cursor-pointer rounded-xl overflow-hidden 
        transition-all duration-300 flex-shrink-0
        w-48 sm:w-64 md:w-80 
        ${isSelected 
          ? 'ring-2 ring-red-500 shadow-lg transform scale-105' 
          : 'ring-2 ring-transparent hover:ring-red-500/50 hover:transform hover:scale-102'
        }
      `} 
      onClick={handleClick}
      onDragStart={(e) => e.preventDefault()}
      style={{ 
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div className="aspect-video relative">
        <img 
          src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`} 
          alt={video.title} 
          className="w-full h-full object-cover"
          draggable={false}
          style={{ 
            pointerEvents: 'none',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
        
        {/* Selection indicator overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-red-500/10"></div>
        )}
      </div>
      
      {/* Video Title */}
      <div className="p-3 md:p-4 bg-background/90 backdrop-blur-sm text-left">
        <p className="text-xs md:text-sm font-medium line-clamp-2 text-foreground">
          {video.title}
        </p>
        {video.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoThumbnailItem;
