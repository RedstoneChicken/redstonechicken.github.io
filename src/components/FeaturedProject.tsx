import { Button } from "@/components/ui/button";
import { Project } from "@/hooks/useProjects";
import { Link } from "react-router-dom";
import { memo } from "react";

interface FeaturedProjectProps {
  project: Project;
  loading?: boolean;
}

const FeaturedProject = memo(({ project, loading }: FeaturedProjectProps) => {
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg tile-hover-effect animate-pulse">
        <div className="w-full h-80 bg-muted/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-3">
          <div className="h-4 bg-muted/20 rounded w-20"></div>
          <div className="h-6 bg-muted/20 rounded w-3/4"></div>
          <div className="h-4 bg-muted/20 rounded w-full"></div>
          <div className="h-4 bg-muted/20 rounded w-2/3"></div>
          <div className="flex gap-3 pt-2">
            <div className="h-9 bg-muted/20 rounded w-24"></div>
            <div className="h-4 bg-muted/20 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  // Support both local public folder paths and external URLs
  const getImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl) {
      return `https://source.unsplash.com/800x600?minecraft,${project.type},featured`;
    }
    
    // If it starts with '/', it's a local path from public folder
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // Otherwise it's an external URL
    return imageUrl;
  };

  const imageUrl = getImageUrl(project.image_url);

  return (
    <div className="relative overflow-hidden rounded-lg tile-hover-effect">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      <img 
        src={imageUrl}
        alt={`${project.name} - Featured ${project.type === 'mod' ? 'Minecraft Addon' : 'Texture Pack'}`}
        className="w-full h-80 object-cover object-center"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://source.unsplash.com/800x600?minecraft,${project.type},featured,${Math.random()}`;
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
            {project.type === 'mod' ? 'Addon' : 'Texture Pack'}
          </span>
          {project.featured && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
              Featured
            </span>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl line-clamp-2">
          {project.short_description}
        </p>
        
        <div className="flex items-center gap-3">
          <Button asChild className="button-hover-effect">
            <Link to={`/project/${project.slug}`}>View Details</Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            {(project.total_download_count || 0).toLocaleString()} downloads
          </div>
        </div>
      </div>
    </div>
  );
});

FeaturedProject.displayName = 'FeaturedProject';

export default FeaturedProject;
