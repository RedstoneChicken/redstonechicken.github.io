
import { useState, useEffect } from 'react';
import { useYouTubeVideos } from '@/hooks/useYouTubeData';
import { Play, Eye, Calendar, ExternalLink, Bell, Users, Youtube, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YouTube = () => {
  const {
    data: videos,
    isLoading,
    error
  } = useYouTubeVideos();
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    document.title = "YouTube - RedstoneChicken MC";
    // Trigger animations after component mounts
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

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
  
  if (error) {
    console.error('YouTube page error:', error);
    return <div className="min-h-screen bg-background font-montserrat flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl font-bold font-montserrat text-gradient-red">Error Loading Videos</h1>
          <p className="text-muted-foreground font-montserrat">There was an error loading the videos. Please try again later.</p>
          <Button onClick={() => window.location.reload()} className="font-montserrat">
            Retry
          </Button>
        </div>
      </div>;
  }

  // Get first 8 videos for 4x2 grid
  const displayVideos = videos?.slice(0, 8) || [];
  
  return <div className="min-h-screen bg-background font-montserrat">
      {/* Hero Section with Channel Info */}
      <section className={`relative py-16 px-6 text-center overflow-hidden transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-red font-montserrat">Redstone Chicken</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-montserrat leading-relaxed">
              Minecraft Redstone Tutorials, Mod Showcases & More
            </p>
          </div>

          {/* Channel Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group bg-red-600 hover:bg-red-700 text-white font-montserrat transition-all duration-300 hover:scale-105">
              <a href="https://www.youtube.com/@redstonechickenmc?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Bell className="h-5 w-5 group-hover:animate-pulse" />
                Subscribe for Updates
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="font-montserrat transition-all duration-300 hover:scale-105">
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                View Full Channel
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Videos Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-8 text-center transition-all duration-1000 delay-200 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold font-montserrat mb-4">Latest Videos</h2>
            <p className="text-muted-foreground font-montserrat">Check out our newest content and tutorials</p>
          </div>

          {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <div key={i} className={`video-tile animate-pulse bg-muted/20 h-80 rounded-lg transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: `${i * 100}ms`
          }}></div>)}
            </div> : displayVideos.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayVideos.map((video, index) => <div key={video.id} className={`video-tile group glass-panel container-glow transition-all duration-700 hover:scale-105 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: `${index * 100 + 400}ms`
          }}>
                  <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                    <div className="video-tile-image">
                      <div className="video-gradient-overlay"></div>
                      <img src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`} alt={video.title} className="transition-transform duration-500 group-hover:scale-110" loading={index < 4 ? "eager" : "lazy"} />
                      <div className="video-play-overlay">
                        <div className="video-play-button group-hover:scale-110 transition-transform duration-300">
                          <Play className="video-play-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="video-tile-content">
                      <h3 className="video-tile-title group-hover:text-primary transition-colors duration-300">
                        {video.title}
                      </h3>
                      <p className="video-tile-description">{video.description}</p>
                      <div className="video-tile-divider"></div>
                      <div className="video-tile-stats">
                        <div className="video-tile-stat">
                          <Eye className="video-tile-stat-icon" />
                          <span>{video.view_count?.toLocaleString()}</span>
                        </div>
                        {video.published_at && <div className="video-tile-stat">
                            <Calendar className="video-tile-stat-icon" />
                            <span>{formatTimeAgo(video.published_at)}</span>
                          </div>}
                      </div>
                    </div>
                  </a>
                </div>)}
            </div> : <div className={`text-center text-muted-foreground transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-montserrat">No videos available at the moment.</p>
            </div>}

          {/* View More Button */}
          {displayVideos.length >= 8 && <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button asChild variant="outline" size="lg" className="font-montserrat transition-all duration-300 hover:scale-105">
                <a href="https://www.youtube.com/@redstonechickenmc/videos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View All Videos
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>}
        </div>
      </section>

      {/* Join Community Section - Copied from Home.tsx */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-left text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Join Our <span className="text-primary relative">
              Community
              <div className="absolute inset-0 text-primary blur-lg opacity-30"></div>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" 
              className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors duration-300 flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1 text-center sm:text-left relative z-10">
                <h3 className="text-lg font-semibold font-montserrat group-hover:text-indigo-300 transition-colors duration-300">Discord Server</h3>
                <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                  Join our Discord for <span className="text-gradient-red">support</span>, updates, and chat with other players
                </p>
              </div>
              
              <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:text-indigo-300 flex-shrink-0">
                Join
              </Button>
            </a>
            
            <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer"
              className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 flex-shrink-0">
                <Youtube className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1 text-center sm:text-left relative z-10">
                <h3 className="text-lg font-semibold font-montserrat group-hover:text-primary transition-colors duration-300">YouTube Channel</h3>
                <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                  Watch <span className="text-gradient-red">tutorials</span>, showcases, and updates about our mods
                </p>
              </div>
              
              <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-primary/30 hover:border-primary/60 hover:bg-primary/10 hover:text-primary flex-shrink-0">
                Subscribe
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>;
};

export default YouTube;
