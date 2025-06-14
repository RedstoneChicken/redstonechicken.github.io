
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useDownloadTracking } from "@/hooks/useDownloadTracking";

interface ProjectFile {
  id: string;
  version_number: string;
  mc_versions: string[];
  file_url: string;
  file_size?: number;
  is_primary: boolean;
  created_at: string;
  file_name?: string;
  changelog?: string;
  download_count?: number;
}

interface ProjectVersionHistoryProps {
  files: ProjectFile[];
  isLoading: boolean;
  compact?: boolean;
  projectId: string;
}

const ProjectVersionHistory = ({ files, isLoading, compact = false, projectId }: ProjectVersionHistoryProps) => {
  const { toast } = useToast();
  const { handleDownload } = useDownloadTracking();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format changelog with bullet points and paragraph spacing
  const formatChangelog = (changelog: string) => {
    if (!changelog) return null;
    
    // Split by double newlines for paragraphs, then by single newlines for bullet points
    const paragraphs = changelog.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split('\n').filter(line => line.trim());
      
      return (
        <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
          {lines.length === 1 ? (
            <p className="text-muted-foreground leading-relaxed">{lines[0]}</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {lines.map((line, lIndex) => (
                <li key={lIndex} className="leading-relaxed">{line.replace(/^[-•*]\s*/, '')}</li>
              ))}
            </ul>
          )}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(compact ? 3 : 5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-32 rounded-xl" />
            <Skeleton className="h-4 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">No version history available.</p>
    );
  }

  return (
    <div className="space-y-6">
      {files.map((file, index) => (
        <div key={file.id} className={`relative ${compact ? 'border-l-2 border-primary/20 pl-4' : 'border-l-4 border-primary/30 pl-6'}`}>
          {!compact && (
            <div className="absolute top-0 left-[-11px] w-5 h-5 rounded-full bg-background border-2 border-primary"></div>
          )}
          
          <div className={`glass-panel p-${compact ? '4' : '6'} rounded-xl hover:border-primary/30 transition-colors`}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'}`}>v{file.version_number}</h3>
                  {index === 0 && !compact && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Latest
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(file.created_at)}</span>
                  </div>
                  {!compact && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(file.created_at)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{file.download_count || 0} downloads</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {file.mc_versions.slice(0, compact ? 3 : 6).map((mcVersion) => (
                    <Badge key={mcVersion} variant="outline" className="text-xs rounded-lg">
                      {mcVersion}
                    </Badge>
                  ))}
                  {file.mc_versions.length > (compact ? 3 : 6) && (
                    <Badge variant="outline" className="text-xs rounded-lg">
                      +{file.mc_versions.length - (compact ? 3 : 6)}
                    </Badge>
                  )}
                </div>

                {file.changelog && (
                  <div className="mb-4 p-4 bg-secondary/30 rounded-lg">
                    <div className={`${compact ? 'text-sm' : 'text-base'}`}>
                      {formatChangelog(file.changelog)}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Download button - Desktop: on the right, Mobile: below content */}
              {!compact && (
                <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0 hidden lg:block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full lg:w-auto rounded-xl hover:bg-primary/10 hover:border-primary/50"
                    onClick={() => handleDownload(
                      projectId, 
                      file.id, 
                      undefined, 
                      `v${file.version_number}.mcpack`
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download v{file.version_number}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile download button - shows below content on small screens */}
            {!compact && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full rounded-xl hover:bg-primary/10 hover:border-primary/50 mt-4 lg:hidden"
                onClick={() => handleDownload(
                  projectId, 
                  file.id, 
                  undefined, 
                  `v${file.version_number}.mcpack`
                )}
              >
                <Download className="h-4 w-4 mr-2" />
                Download v{file.version_number}
              </Button>
            )}

            {/* Compact download button */}
            {compact && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full rounded-xl hover:bg-primary/10 hover:border-primary/50 mt-4"
                onClick={() => handleDownload(
                  projectId, 
                  file.id, 
                  undefined, 
                  `v${file.version_number}.mcpack`
                )}
              >
                <Download className="h-4 w-4 mr-2" />
                Download v{file.version_number}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectVersionHistory;
