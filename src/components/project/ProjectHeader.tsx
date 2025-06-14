
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Star, Clock } from "lucide-react";

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    type: string;
    total_download_count?: number;
    updated_at: string;
    featured?: boolean;
    short_description: string;
  };
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="section-fade-in-2" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold break-words text-left">{project.name}</h1>
            <Badge className="bg-primary/10 text-primary no-hover flex items-center gap-1">
              <Star className="h-3 w-3" />
              {project.type === 'mod' ? 'Addon' : 'Texture Pack'}
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-primary" />
              <span>{(project.total_download_count || 0).toLocaleString()} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Updated {formatDate(project.updated_at)}</span>
            </div>
            {project.featured && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-yellow-500">Featured Project</span>
              </div>
            )}
          </div>
          
          <p className="text-lg text-muted-foreground break-words leading-relaxed text-left">
            {project.short_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
