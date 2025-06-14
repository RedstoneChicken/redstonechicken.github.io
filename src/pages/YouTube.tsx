import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Youtube, Play } from "lucide-react";
import { useChannelStats, useLatestVideos } from "@/hooks/useYouTubeData";
import { useState, useEffect } from "react";
const YouTube = () => {
  const isMobile = useIsMobile();
  const {
    data: channelStats
  } = useChannelStats();
  const {
    data: videos
  } = useLatestVideos(6);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // Function to format time ago for videos
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'Posted today';
    if (diffDays === 1) return 'Posted yesterday';
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
  };
  return <div className="min-h-screen bg-transparent font-montserrat animate-page-enter">
      {/* Hero Section */}
      <div className="relative py-16 px-6 text-center">
        {/* Single centered red glow */}
        <div className="absolute inset-0 z-[-10]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground animate-fade-in">
            Redstone Chicken's YouTube Channel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-from-top">
            Watch my latest <span className="text-gradient-red font-semibold">YouTube videos</span>, redstone contraptions, and behind-the-scenes content. 
            <span className="text-gradient-red font-semibold"> Subscribe</span> for weekly updates!
          </p>
          
          {/* Enhanced Subscribe Button with slow wiggle */}
          <div className="mt-8">
            <Button asChild className="red-glow px-8 py-4 text-lg font-semibold animate-wiggle hover:animate-none">
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Youtube className="h-6 w-6" />
                Subscribe Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Channel Stats - Redesigned */}
        <div className="mb-12 relative overflow-hidden">
          {/* Subtle red glow in corner */}
          <div className="absolute inset-0 z-[1]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[60px]"></div>
        </div>
      
          <div className="secondary-panel p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-2 animate-gentle-float" style={{
              animationDelay: "0.1s"
            }}>
                <div className="text-4xl font-bold text-gradient-red">{channelStats?.subscribers?.toLocaleString()}</div>
                <div className="text-muted-foreground">Subscribers</div>
              </div>
              <div className="text-center space-y-2 animate-gentle-float" style={{
              animationDelay: "0.3s"
            }}>
                <div className="text-4xl font-bold text-gradient-red">{channelStats?.total_views?.toLocaleString()}</div>
                <div className="text-muted-foreground">Total Views</div>
              </div>
              <div className="text-center space-y-2 animate-gentle-float" style={{
              animationDelay: "0.5s"
            }}>
                <div className="text-4xl font-bold text-gradient-red">{channelStats?.video_count}</div>
                <div className="text-muted-foreground">Videos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Grid - Using new grid system */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Latest <span className="text-gradient-red">Videos</span></h2>
            <p className="text-muted-foreground">Recent uploads and highlights</p>
          </div>

          <div className="tiles-grid mb-8">
            {videos?.map((video, index) => (
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
                      <span>{video.view_count?.toLocaleString()} views</span>
                      {video.published_at && <span>{formatTimeAgo(video.published_at)}</span>}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="hover:bg-primary/10 group px-6 py-3">
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                View More Videos
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Join Community Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-left text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Join Our <span className="text-primary">Community</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" 
              className="tile-hover-effect p-6 rounded-lg flex items-center gap-4 glass-panel interactive-element">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 0 0 4 4 4 4 0 0 0-4-8 4 4 0 0 0 0 4Z" />
                  <path d="M18 9.5c.5 1.5 .5 4.5 0 6-4 2-8.5 2-12.5 0" />
                  <path d="M18 9.5c-4-2-8.5-2-12.5 0" />
                  <path d="M2 17.5C.5 16 .5 8 2 6.5 6 3.5 18 3.5 22 6.5c1.5 1.5 1.5 9.5 0 11-4 3-16 3-20 0Z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold font-montserrat text-left">Discord Server</h3>
                <p className="text-sm font-montserrat text-muted-foreground text-left">Join our Discord for <span className="text-gradient-red">support</span>, updates, and chat with other players</p>
              </div>
              <Button size="sm" variant="outline" className="font-montserrat">
                Join
              </Button>
            </a>
            
            <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer"
              className="tile-hover-effect p-6 rounded-lg flex items-center gap-4 glass-panel interactive-element">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Youtube className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold font-montserrat text-left">YouTube Channel</h3>
                <p className="text-sm font-montserrat text-muted-foreground text-left">Watch <span className="text-gradient-red">tutorials</span>, showcases, and updates about our mods</p>
              </div>
              <Button size="sm" variant="outline" className="font-montserrat">
                Subscribe
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced YouTube Button */}
      
    </div>;
};
export default YouTube;