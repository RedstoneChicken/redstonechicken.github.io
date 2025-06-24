
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback, memo } from "react";
import PerformanceOptimizedImage from "./PerformanceOptimizedImage";

interface Project {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  image_url?: string;
  type: string;
  mc_versions: string[];
  total_download_count?: number;
  updated_at: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  loading?: boolean;
  className?: string;
  priority?: boolean;
}

const OptimizedProjectCard = memo(({ project, loading = false, className, priority = false }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatTimeAgo = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Updated today';
    if (diffDays === 1) return 'Updated 1 day ago';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Updated ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `Updated ${years} year${years > 1 ? 's' : ''} ago`;
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (loading) {
    return (
      <div className={cn("w-full performance-container", className)}>
        <div className="project-tile glass-panel consistent-tile-height">
          <div className="project-tile-image">
            <div className="w-full h-full bg-muted animate-pulse gpu-accelerated" />
          </div>
          <div className="project-tile-content">
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse mb-1" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-2" />
            <div className="project-tile-divider" />
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded animate-pulse w-16" />
              <div className="h-3 bg-muted rounded animate-pulse w-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const projectSlug = project.slug || project.id;
  const fallbackImageUrl = `https://source.unsplash.com/400x225?minecraft&${project.id}`;
  const imageUrl = project.image_url || fallbackImageUrl;

  return (
    <div className={cn("w-full performance-container", className)}>
      <Link to={`/project/${projectSlug}`} className="block w-full">
        <div className="project-tile glass-panel consistent-tile-height optimized-hover gpu-accelerated">
          <div className="project-tile-image">
            <PerformanceOptimizedImage
              src={imageError ? fallbackImageUrl : imageUrl}
              alt={`${project.name} - ${project.type === 'mod' ? 'Minecraft Addon' : 'Texture Pack'}`}
              width={400}
              height={225}
              priority={priority}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            
            <Badge className="project-tile-badge-type">
              {project.type === 'mod' ? 'Addon' : 'Texture Pack'}
            </Badge>

            {project.featured && (
              <Badge className="project-tile-badge-featured">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            )}
          </div>

          <div className="project-tile-content stable-layout">
            <h3 className="project-tile-title">
              {project.name}
            </h3>
            <p className="project-tile-description">
              {project.short_description}
            </p>
            
            <div className="project-tile-divider"></div>
            
            <div className="project-tile-stats">
              <div className="project-tile-stat">
                <Clock className="project-tile-stat-icon" />
                <span>{formatTimeAgo(project.updated_at)}</span>
              </div>
              <div className="project-tile-stat">
                <Download className="project-tile-stat-icon" />
                <span>{(project.total_download_count || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

OptimizedProjectCard.displayName = 'OptimizedProjectCard';

export default OptimizedProjectCard;
