
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";
import { useDownloadTracking } from "@/hooks/useDownloadTracking";
import { useEffect, useState } from "react";
import type { ProjectFile } from '@/hooks/useProjectFiles';
import type { ProjectAddon } from '@/hooks/useProjectAddons';

interface ProjectDownloadFilesProps {
  files: ProjectFile[];
  addons: ProjectAddon[];
  projectId: string;
}

const ProjectDownloadFiles = ({ files, addons, projectId }: ProjectDownloadFilesProps) => {
  const { handleDownload } = useDownloadTracking();
  const [downloadCounts, setDownloadCounts] = useState<{ [key: string]: number }>({});

  // Listen for download completion events
  useEffect(() => {
    const handleDownloadCompleted = (event: CustomEvent) => {
      const { projectId: completedProjectId, fileId, addonId } = event.detail;
      if (completedProjectId === projectId) {
        if (fileId) {
          setDownloadCounts(prev => ({
            ...prev,
            [`file_${fileId}`]: (prev[`file_${fileId}`] || 0) + 1
          }));
        }
        if (addonId) {
          setDownloadCounts(prev => ({
            ...prev,
            [`addon_${addonId}`]: (prev[`addon_${addonId}`] || 0) + 1
          }));
        }
      }
    };

    window.addEventListener('downloadCompleted', handleDownloadCompleted as EventListener);
    return () => {
      window.removeEventListener('downloadCompleted', handleDownloadCompleted as EventListener);
    };
  }, [projectId]);

  const handleFileDownload = async (file: ProjectFile) => {
    console.log(`🚀 Starting file download for version ${file.version_number}`);
    await handleDownload(
      projectId, 
      file.id, 
      undefined, 
      `v${file.version_number}.mcpack`
    );
  };

  const handleAddonDownload = async (addon: ProjectAddon) => {
    console.log(`🚀 Starting addon download for ${addon.name}`);
    await handleDownload(
      projectId, 
      undefined, 
      addon.id, 
      `${addon.name}.mcpack`
    );
  };

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

  const primaryFile = files.find(file => file.is_primary);
  const otherFiles = files.filter(file => !file.is_primary);

  if (files.length === 0 && addons.length === 0) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No download files available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Primary Download */}
      {primaryFile && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Latest Version</h3>
          <div className="glass-panel p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium">Version {primaryFile.version_number}</h4>
                <p className="text-sm text-muted-foreground">{primaryFile.file_type?.toUpperCase()}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Latest
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(primaryFile.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{(primaryFile.download_count || 0) + (downloadCounts[`file_${primaryFile.id}`] || 0)} downloads</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {primaryFile.mc_versions.map((version) => (
                <Badge key={version} variant="outline" className="text-xs">
                  {version}
                </Badge>
              ))}
            </div>

            {primaryFile.changelog && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">What's New:</h5>
                <p className="text-sm text-muted-foreground">{primaryFile.changelog}</p>
              </div>
            )}

            <Button 
              className="w-full red-glow" 
              onClick={() => handleFileDownload(primaryFile)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download v{primaryFile.version_number}
            </Button>
          </div>
        </div>
      )}

      {/* Addons Section - Updated styling */}
      {addons.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add-ons & Extras</h3>
          <div className="space-y-3">
            {addons.map((addon) => (
              <div key={addon.id} className="glass-panel p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{addon.name}</h4>
                    {addon.description && (
                      <p className="text-xs text-muted-foreground mt-1">{addon.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {addon.category?.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Days ago indicator */}
                <div className="text-xs text-muted-foreground mb-1">
                  {formatTimeAgo(addon.created_at)}
                </div>
                
                {/* Download count below days ago */}
                <div className="text-xs text-muted-foreground mb-4">
                  {(addon.download_count || 0) + (downloadCounts[`addon_${addon.id}`] || 0)} downloads
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {addon.mc_versions.map((version) => (
                    <Badge key={version} variant="outline" className="text-xs">
                      {version}
                    </Badge>
                  ))}
                </div>

                {/* Large red button spanning full width with more spacing */}
                <Button 
                  className="w-full red-glow mt-4" 
                  onClick={() => handleAddonDownload(addon)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {addon.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Files */}
      {otherFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {primaryFile ? 'Previous Versions' : 'Available Downloads'}
          </h3>
          <div className="space-y-3">
            {otherFiles.map((file) => (
              <div key={file.id} className="glass-panel p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Version {file.version_number}</h4>
                    <p className="text-xs text-muted-foreground">{file.file_type?.toUpperCase()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{formatDate(file.created_at)}</span>
                  <span>{(file.download_count || 0) + (downloadCounts[`file_${file.id}`] || 0)} downloads</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {file.mc_versions.map((version) => (
                    <Badge key={version} variant="outline" className="text-xs">
                      {version}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => handleFileDownload(file)}
                >
                  <Download className="h-3 w-3 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDownloadFiles;
