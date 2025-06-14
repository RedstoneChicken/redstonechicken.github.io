import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText } from "lucide-react";
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
  download_count?: number;
}

interface ProjectAddon {
  id: string;
  name: string;
  description?: string;
  file_url: string;
  file_size?: number;
  created_at: string;
  download_count?: number;
}

interface ProjectMainDownloadProps {
  files: ProjectFile[];
  addons: ProjectAddon[];
  projectId: string;
}

const ProjectMainDownload = ({ files, addons, projectId }: ProjectMainDownloadProps) => {
  const { handleDownload } = useDownloadTracking();

  const primaryFile = files.find(file => file.is_primary) || files[0];

  function formatFileSize(bytes?: number) {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }

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

  const handleFileDownload = async (file: ProjectFile) => {
    await handleDownload(
      projectId, 
      file.id, 
      undefined, 
      file.file_name || `v${file.version_number}.mcpack`
    );
  };

  const handleAddonDownload = async (addon: ProjectAddon) => {
    await handleDownload(
      projectId, 
      undefined, 
      addon.id, 
      `${addon.name}.mcpack`
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-montserrat">Downloads</h2>
      
      {/* Primary Download */}
      {primaryFile && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-border/30 red-border-hover tile-hover-effect">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold font-montserrat">Latest Version</h3>
              <Badge className="bg-primary/10 text-primary no-hover">
                v{primaryFile.version_number}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground mb-4 font-montserrat">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Minecraft {primaryFile.mc_versions.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Released {formatDate(primaryFile.created_at)}</span>
              </div>
              {primaryFile.file_size && (
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>{formatFileSize(primaryFile.file_size)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>{primaryFile.download_count || 0} downloads</span>
              </div>
            </div>
            
            <Button 
              onClick={() => handleFileDownload(primaryFile)}
              className="w-full red-border-hover interactive-element font-montserrat tile-hover-effect"
            >
              <Download className="h-4 w-4 mr-2" />
              Download v{primaryFile.version_number}
            </Button>
          </div>
        </div>
      )}
      
      {/* Additional Files/Addons */}
      {addons.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold font-montserrat">Additional Downloads</h3>
          {addons.map((addon) => (
            <div key={addon.id} className="glass-panel p-4 rounded-xl border border-border/30 red-border-hover tile-hover-effect">
              <div className="mb-3">
                <h4 className="font-medium font-montserrat text-left">{addon.name}</h4>
                
                {addon.description && (
                  <p className="text-sm text-muted-foreground mt-1 font-montserrat text-left">
                    {addon.description}
                  </p>
                )}
                
                {/* Days ago indicator with Calendar icon */}
                <div className="text-sm text-muted-foreground font-montserrat mt-2 text-left flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatTimeAgo(addon.created_at)}</span>
                </div>
                
                {/* Download count with Download icon */}
                <div className="text-sm text-muted-foreground font-montserrat mt-1 text-left flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>{addon.download_count || 0} downloads</span>
                </div>
              </div>
              
              {/* Large red button with increased spacing */}
              <div className="mt-6">
                <Button 
                  onClick={() => handleAddonDownload(addon)}
                  className="w-full red-border-hover interactive-element font-montserrat tile-hover-effect"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {files.length === 0 && addons.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground font-montserrat">No downloads available</p>
        </div>
      )}
    </div>
  );
};

export default ProjectMainDownload;
