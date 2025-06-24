
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedVideos } from "@/hooks/useYouTubeData";

const FeaturedVideosSection = () => {
  const { data: featuredVideos, isLoading: videosLoading } = useFeaturedVideos(4);

  // Function to format time ago for videos
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-left text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured <span className="text-primary">Videos</span>
              </h2>
              <Button asChild variant="outline" className="ml-4">
                <Link to="/youtube" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground text-lg hidden sm:block">
              Watch the latest tutorials, showcases, and mod updates from our YouTube channel
            </p>
          </div>
        </div>

        {/* Video Grid */}
        {!videosLoading && featuredVideos ? (
          <div className="tiles-grid">
            {featuredVideos.slice(0, 4).map((video, index) => (
              <div key={video.id} className="video-tile group glass-panel container-glow">
                <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                  <div className="video-tile-image">
                    <div className="video-gradient-overlay"></div>
                    <img src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`} alt={video.title} />
                    <div className="video-play-overlay">
                      <div className="video-play-button">
                        <Play className="video-play-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="video-tile-content">
                    <h3 className="video-tile-title">{video.title}</h3>
                    <p className="video-tile-description">{video.description}</p>
                    <div className="video-tile-divider"></div>
                    <div className="video-tile-stats">
                      <div className="video-tile-stat">
                        <Eye className="video-tile-stat-icon" />
                        <span>{video.view_count?.toLocaleString()}</span>
                      </div>
                      {video.published_at && (
                        <div className="video-tile-stat">
                          <Calendar className="video-tile-stat-icon" />
                          <span>{formatTimeAgo(video.published_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No featured videos available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVideosSection;
