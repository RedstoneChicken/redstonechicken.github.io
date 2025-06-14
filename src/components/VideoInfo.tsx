
import { Calendar, Eye } from 'lucide-react';

interface VideoInfoProps {
  title: string;
  description: string;
  publishedAt?: string;
  viewCount?: number;
}

const VideoInfo = ({ title, description, publishedAt, viewCount }: VideoInfoProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const formatViews = (views?: number) => {
    if (!views) return '0';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20">
      <h3 className="text-lg font-semibold text-white mb-2 font-montserrat text-left">{title}</h3>
      <p className="text-sm text-white/80 font-montserrat line-clamp-2 mb-2 text-left">{description}</p>
      <div className="flex items-center gap-4 text-xs text-white/70">
        {publishedAt && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(publishedAt)}</span>
          </div>
        )}
        {viewCount && (
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{formatViews(viewCount)} views</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
