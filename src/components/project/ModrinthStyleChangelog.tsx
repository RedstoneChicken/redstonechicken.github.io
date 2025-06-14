
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Download } from "lucide-react";
import { useDownloadTracking } from "@/hooks/useDownloadTracking";

interface ProjectFile {
  id: string;
  version_number: string;
  mc_versions: string[];
  created_at: string;
  changelog?: string;
  download_count?: number;
}

interface ModrinthStyleChangelogProps {
  files: ProjectFile[];
  isLoading: boolean;
  compact?: boolean;
  projectId?: string;
}

const ModrinthStyleChangelog = ({ files, isLoading, compact = false, projectId }: ModrinthStyleChangelogProps) => {
  const { trackDownload } = useDownloadTracking();

  const handleVersionDownload = async (file: ProjectFile) => {
    if (!projectId) return;

    await trackDownload(
      projectId, 
      file.id, 
      undefined, 
      `v${file.version_number}.mcpack`
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'today';
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl animate-pulse">
            <div className="h-4 bg-muted/20 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-muted/20 rounded w-full mb-1"></div>
            <div className="h-3 bg-muted/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p className="font-montserrat">No version history available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div key={file.id} className="relative">
          {/* Timeline line */}
          {index !== files.length - 1 && (
            <div className="absolute left-4 top-8 w-0.5 h-full bg-border/50"></div>
          )}
          
          <div className="flex gap-4">
            {/* Timeline dot */}
            <div className="relative">
              <div className="w-8 h-8 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="glass-panel p-4 rounded-xl hover-scale transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold font-montserrat text-foreground">
                        {file.version_number}
                      </h3>
                      <div className="flex items-center gap-2">
                        {file.mc_versions.map((mcVersion) => (
                          <Badge key={mcVersion} variant="secondary" className="text-xs font-montserrat no-hover">
                            {mcVersion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-montserrat mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(file.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {file.download_count || 0} downloads
                      </div>
                    </div>
                    
                    {file.changelog && (
                      <div className="text-sm text-muted-foreground font-montserrat leading-relaxed border-l-2 border-primary/30 pl-4 mb-4">
                        {file.changelog.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-1 last:mb-0">
                            {line || '\u00A0'}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Download button - Desktop: positioned beside content */}
                  {projectId && (
                    <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0 hidden lg:block">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVersionDownload(file)}
                        className="interactive-element"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>

                {/* Mobile download button - positioned below changelog */}
                {projectId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVersionDownload(file)}
                    className="interactive-element w-full lg:hidden"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModrinthStyleChangelog;
