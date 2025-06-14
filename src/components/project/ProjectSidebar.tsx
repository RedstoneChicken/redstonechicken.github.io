
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, FileText, ChevronDown, Download, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProjectMainDownload from "./ProjectMainDownload";
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
}

interface ProjectAddon {
  id: string;
  name: string;
  description?: string;
  file_url: string;
  file_size?: number;
  created_at: string;
}

interface ProjectSidebarProps {
  files: ProjectFile[];
  addons: ProjectAddon[];
  projectId: string;
  showVersionHistory: boolean;
  setShowVersionHistory: (show: boolean) => void;
}

const ProjectSidebar = ({
  files,
  addons,
  projectId,
  showVersionHistory,
  setShowVersionHistory
}: ProjectSidebarProps) => {
  const {
    handleDownload
  } = useDownloadTracking();

  const handleFileDownload = async (file: ProjectFile) => {
    await handleDownload(projectId, file.id, undefined, file.file_name || `v${file.version_number}.mcpack`);
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Released today';
    if (diffDays === 1) return 'Released 1 day ago';
    if (diffDays < 7) return `Released ${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Released ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Released ${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `Released ${years} year${years > 1 ? 's' : ''} ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const latestFile = files.find(file => file.is_primary) || files[0];

  return (
    <div className="space-y-6 section-fade-in-6" style={{ animationDelay: "0.5s" }}>
      {/* Main Download Section */}
      <div id="download-section" className="glass-panel p-6 rounded-xl shadow-xl">
        <ProjectMainDownload files={files} addons={addons} projectId={projectId} />
      </div>

      {/* Additional Downloads - Collapsible */}
      {files.length > 1 && (
        <Collapsible open={showVersionHistory} onOpenChange={setShowVersionHistory}>
          <div className="glass-panel p-6 rounded-xl shadow-lg">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto rounded-xl tile-hover-effect interactive-element">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-semibold text-left">Previous Versions</h3>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showVersionHistory ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 animate-fade-in">
              <div className="space-y-3">
                {files.filter(file => !file.is_primary).slice(0, 5).map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover-optimized">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-left">v{file.version_number}</p>
                      <p className="text-xs text-muted-foreground text-left">{file.mc_versions.join(', ')}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{formatDate(file.created_at)}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleFileDownload(file)} className="tile-hover-effect interactive-element flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
      
      {/* Support Section */}
      <div className="glass-panel p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-left">Support & Resources</h2>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4 text-left">
            Need help or found a bug?
          </p>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" size="sm" asChild className="tile-hover-effect transition-all duration-300 rounded-xl interactive-element">
              <Link to="/support" className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Installation Guide
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="tile-hover-effect transition-all duration-300 rounded-xl interactive-element">
              <a href="https://discord.gg/redstone" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Discord Support
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="tile-hover-effect transition-all duration-300 rounded-xl interactive-element">
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                YouTube Channel
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;
