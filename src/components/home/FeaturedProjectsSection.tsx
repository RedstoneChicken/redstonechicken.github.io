
import { Button } from "@/components/ui/button";
import OptimizedProjectCard from "@/components/OptimizedProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedProjects } from "@/hooks/useProjects";
import { useEffect, memo } from "react";

const FeaturedProjectsSection = memo(() => {
  const { data: featuredProjects, isLoading: projectsLoading } = useFeaturedProjects();

  // Preload critical images for featured projects
  useEffect(() => {
    if (featuredProjects && featuredProjects.length > 0) {
      // Preload first 4 featured project images with performance considerations
      const preloadImages = async () => {
        const preloadPromises = featuredProjects.slice(0, 4).map((project) => {
          if (project.image_url) {
            return new Promise<void>((resolve) => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = project.image_url!;
              link.onload = () => resolve();
              link.onerror = () => resolve();
              document.head.appendChild(link);
            });
          }
          return Promise.resolve();
        });
        
        await Promise.all(preloadPromises);
      };
      
      preloadImages();
    }
  }, [featuredProjects]);

  return (
    <section className="py-8 px-6 performance-container">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-left text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <Button asChild variant="outline" className="ml-4 optimized-hover">
                <Link to="/downloads" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground text-lg hidden sm:block">
              Explore our most popular Minecraft mods, addons, and texture packs
            </p>
          </div>
        </div>
        
        {projectsLoading ? (
          <div className="tiles-grid">
            {[...Array(6)].map((_, i) => (
              <OptimizedProjectCard key={i} project={{} as any} loading={true} />
            ))}
          </div>
        ) : featuredProjects && featuredProjects.length > 0 ? (
          <div className="tiles-grid">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="container-glow">
                <OptimizedProjectCard 
                  project={project}
                  className={index < 4 ? "priority-load" : ""}
                  priority={index < 4}
                />
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
  );
});

FeaturedProjectsSection.displayName = 'FeaturedProjectsSection';

export default FeaturedProjectsSection;
