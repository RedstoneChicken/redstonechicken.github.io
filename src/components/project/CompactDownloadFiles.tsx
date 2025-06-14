import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDownloadTracking } from "@/hooks/useDownloadTracking";
import type { ProjectFile } from '@/hooks/useProjectFiles';
import type { ProjectAddon } from '@/hooks/useProjectAddons';

interface CompactDownloadFilesProps {
  files: ProjectFile[];
  addons: ProjectAddon[];
  projectId: string;
}

const CompactDownloadFiles = ({ files, addons, projectId }: CompactDownloadFilesProps) => {
  const { toast } = useToast();
  const { trackDownload } = useDownloadTracking();

  const handleFileDownload = async (file: ProjectFile) => {
    await trackDownload(
      projectId, 
      file.id, 
      undefined, 
      file.file_name || `v${file.version_number}.mcpack`
    );
  };

  const handleAddonDownload = async (addon: ProjectAddon) => {
    await trackDownload(
      projectId, 
      undefined, 
      addon.id, 
      `${addon.name}.mcpack`
    );
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

  const primaryFile = files.find(file => file.is_primary);
  const otherFiles = files.filter(file => !file.is_primary);

  if (files.length === 0 && addons.length === 0) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No downloads available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Primary Download */}
      {primaryFile && (
        <div className="space-y-3">
          <div className="border border-border/50 rounded-lg p-3 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">v{primaryFile.version_number}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {primaryFile.mc_versions.slice(0, 2).map((version) => (
                    <Badge key={version} variant="outline" className="text-xs px-1 py-0">
                      {version}
                    </Badge>
                  ))}
                  {primaryFile.mc_versions.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{primaryFile.mc_versions.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                Latest
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span>{formatTimeAgo(primaryFile.created_at)}</span>
              <span>{primaryFile.download_count || 0} downloads</span>
            </div>

            <Button 
              className="w-full red-glow" 
              size="sm"
              onClick={() => handleFileDownload(primaryFile)}
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      )}

      {/* Other Versions */}
      {otherFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Previous Versions</h4>
          {otherFiles.slice(0, 3).map((file) => (
            <div key={file.id} className="border border-border/30 rounded-md p-2 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">v{file.version_number}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(file.created_at)}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {file.mc_versions.slice(0, 3).map((version) => (
                  <Badge key={version} variant="outline" className="text-xs px-1 py-0">
                    {version}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{file.download_count || 0} downloads</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-7 hover:bg-primary/10 hover:border-primary/50" 
                onClick={() => handleFileDownload(file)}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          ))}
          {otherFiles.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">
              +{otherFiles.length - 3} more versions
            </p>
          )}
        </div>
      )}

      {/* Addons */}
      {addons.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Add-ons</h4>
          {addons.map((addon) => (
            <div key={addon.id} className="border border-border/30 rounded-md p-2 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{addon.name}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(addon.created_at)}</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{addon.download_count || 0} downloads</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-7 hover:bg-primary/10 hover:border-primary/50" 
                onClick={() => handleAddonDownload(addon)}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactDownloadFiles;
