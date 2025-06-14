
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Tag, Star, Clock, Users } from "lucide-react";
import type { Project } from '@/hooks/useProjects';

interface ProjectStatsProps {
  project: Project;
}

const ProjectStats = ({ project }: ProjectStatsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return '1 day ago';
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Project Info</h2>
      
      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-secondary/30 rounded-xl">
          <div className="text-2xl font-bold text-primary">{(project.total_download_count || 0).toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Downloads</div>
        </div>
        <div className="text-center p-4 bg-secondary/30 rounded-xl">
          <div className="text-2xl font-bold text-primary">{formatTimeAgo(project.updated_at)}</div>
          <div className="text-sm text-muted-foreground">Last Updated</div>
        </div>
      </div>

      {/* Project Type & Featured */}
      <div className="space-y-3">
        <h3 className="font-semibold">Category</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 rounded-lg">
            <Tag className="h-3 w-3" />
            {project.type === 'mod' ? 'Addon' : 'Texture Pack'}
          </Badge>
          {project.featured && (
            <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 rounded-lg">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="space-y-4">
        <h3 className="font-semibold">Details</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download className="h-4 w-4" />
              <span>Total Downloads</span>
            </div>
            <span className="font-semibold text-lg">{(project.total_download_count || 0).toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last Updated</span>
            </div>
            <span className="text-sm">{formatDate(project.updated_at)}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Published</span>
            </div>
            <span className="text-sm">{formatDate(project.created_at)}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Project ID</span>
            </div>
            <span className="text-sm font-mono">{project.slug}</span>
          </div>
        </div>
      </div>

      {/* Minecraft Versions */}
      <div className="space-y-3">
        <h3 className="font-semibold">Compatible Versions</h3>
        <div className="flex flex-wrap gap-2">
          {project.mc_versions.map((version) => (
            <Badge key={version} variant="outline" className="text-xs rounded-lg">
              {version}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
