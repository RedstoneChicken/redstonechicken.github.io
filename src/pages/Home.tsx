
import { Button } from "@/components/ui/button";
import OptimizedProjectCard from "@/components/OptimizedProjectCard";
import { ArrowRight, Download, Youtube, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFeaturedProjects } from "@/hooks/useProjects";
import { useFeaturedVideos } from "@/hooks/useYouTubeData";
import { useLayoutInfo } from '@/hooks/useLayoutInfo';

const Home = () => {
  const { data: featuredProjects, isLoading: projectsLoading } = useFeaturedProjects();
  const { data: featuredVideos, isLoading: videosLoading } = useFeaturedVideos(4);
  
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { navbarHeight } = useLayoutInfo();
  
  useEffect(() => {
    // Scroll to top on page load
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
  
  return (
    <div className="min-h-screen bg-transparent animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        {/* Single centered red glow */}
        <div className="absolute inset-0 z-[-10]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-fade-in">
            Welcome to<br />
            <span className="text-primary">Redstone Chicken</span>
          </h1>
          <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Home to <span className="text-gradient-red font-semibold">Minecraft mods</span>, resource packs, and video content
            by Redstone Chicken. <span className="text-gradient-red font-semibold">Enhance your gameplay</span> with custom creations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="px-6 py-4 text-base font-semibold font-montserrat">
              <Link to="/downloads" className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Browse Downloads
              </Link>
            </Button>
            <Button asChild variant="outline" className="hover:bg-primary/10 px-6 py-4 text-base font-montserrat">
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                <Youtube className="h-5 w-5 text-primary" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>

      {/* Content sections with updated padding */}
      <div className="space-y-16 py-16">
        {/* Featured Videos Section */}
        <section className="px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4 text-left">Featured <span className="text-gradient-red">Videos</span></h2>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-xl text-left">Watch our <span className="text-gradient-red font-medium">featured content</span></p>
          </div>

          {/* Video Grid - Fix to show 4 videos */}
          <div className="tiles-grid mb-8">
            {!videosLoading && featuredVideos?.slice(0, 4).map((video, index) => (
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
                      {video.published_at && (
                        <span>{formatTimeAgo(video.published_at)}</span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" className="hover:bg-primary/10 group font-montserrat red-border-hover">
              <Link to="/youtube" className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-primary" />
                Visit YouTube Channel
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-left text-3xl md:text-4xl font-bold text-foreground">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <Button asChild variant="outline">
                <Link to="/downloads" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {projectsLoading ? (
              <div className="tiles-grid">
                {[...Array(6)].map((_, i) => (
                  <OptimizedProjectCard key={i} project={{} as any} loading={true} />
                ))}
              </div>
            ) : featuredProjects && featuredProjects.length > 0 ? (
              <div className="tiles-grid">
                {featuredProjects.map((project) => (
                  <div key={project.id} className="container-glow">
                    <OptimizedProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No featured projects available at the moment.</p>
              </div>
            )}
          </div>
        </section>
        
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
      </div>
    </div>
  );
};

export default Home;
