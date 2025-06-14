
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Global flag to prevent concurrent downloads
let downloadInProgress = false;

export const useDownloadTracking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const downloadFile = (url: string, filename: string) => {
    try {
      console.log('📥 Starting direct download:', { url, filename });
      
      // Create download link and trigger immediately
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Append, click, and remove immediately
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Direct download initiated successfully');
      return true;
    } catch (error) {
      console.error(`❌ Download failed: ${filename}`, error);
      return false;
    }
  };

  const invalidateQueries = async (projectId: string) => {
    console.log('🔄 Invalidating React Query cache for project:', projectId);
    
    // Invalidate all project-related queries
    await Promise.all([
      queryClient.invalidateQueries({ 
        queryKey: ['projects', 'slug'] 
      }),
      queryClient.invalidateQueries({ 
        queryKey: ['project-files', projectId] 
      }),
      queryClient.invalidateQueries({ 
        queryKey: ['project-addons', projectId] 
      }),
      queryClient.invalidateQueries({ 
        queryKey: ['projects'] 
      }),
      queryClient.invalidateQueries({ 
        queryKey: ['projects', 'featured'] 
      }),
      queryClient.invalidateQueries({ 
        queryKey: ['projects', 'latest'] 
      })
    ]);
    
    console.log('✅ React Query cache invalidated successfully');
  };

  const showSuccessToast = (projectName: string, versionInfo: string) => {
    console.log('🎉 Showing success toast:', { projectName, versionInfo });
    
    // Only use primary toast (Radix UI) - removed duplicate Sonner toast
    toast({
      title: "Download Started",
      description: `${projectName} ${versionInfo} download has begun.`,
    });
  };

  const showErrorToast = (projectName: string, error: string) => {
    console.log('❌ Showing error toast:', { projectName, error });
    
    // Only use primary toast (Radix UI) - removed duplicate Sonner toast
    toast({
      title: "Download Failed",
      description: `Download failed${projectName ? ` for ${projectName}` : ''}: ${error}`,
      variant: "destructive",
    });
  };

  const trackDownload = useCallback(
    async (projectId: string, fileId?: string, addonId?: string, filename: string = 'download.mcpack') => {
      console.log('🔄 Starting download tracking:', { projectId, fileId, addonId, filename });
      
      // Prevent double downloads
      if (downloadInProgress) {
        console.log('⚠️ Download already in progress, skipping');
        toast({
          title: "Download In Progress",
          description: "Please wait for the current download to complete.",
          variant: "destructive",
        });
        return { success: false, error: 'Download already in progress' };
      }
      
      downloadInProgress = true;
      
      // Declare variables outside try block so they're accessible in catch
      let downloadUrl = '';
      let actualFilename = filename;
      let projectName = '';
      let versionInfo = '';
      
      try {
        console.log('📡 Attempting database tracking...');
        
        // Get project name first
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('name')
          .eq('id', projectId)
          .single();
        
        if (!projectError && projectData) {
          projectName = projectData.name;
        }
        
        if (fileId) {
          console.log('📁 Fetching file data for fileId:', fileId);
          const { data: fileData, error: fileError } = await supabase
            .from('project_files')
            .select('file_url, file_name, version_number')
            .eq('id', fileId)
            .single();
          
          if (fileError) {
            console.error('❌ File fetch error:', fileError);
            throw new Error(`File not found: ${fileError.message}`);
          }
          
          downloadUrl = fileData.file_url;
          actualFilename = fileData.file_name || `v${fileData.version_number}.mcpack`;
          versionInfo = `v${fileData.version_number}`;
          console.log('📁 File URL retrieved:', downloadUrl, 'Filename:', actualFilename);
        } else if (addonId) {
          console.log('🧩 Fetching addon data for addonId:', addonId);
          const { data: addonData, error: addonError } = await supabase
            .from('project_addons')
            .select('file_url, name, version_number')
            .eq('id', addonId)
            .single();
          
          if (addonError) {
            console.error('❌ Addon fetch error:', addonError);
            throw new Error(`Addon not found: ${addonError.message}`);
          }
          
          downloadUrl = addonData.file_url;
          actualFilename = `${addonData.name}.mcpack`;
          versionInfo = addonData.version_number || 'Latest';
          console.log('🧩 Addon URL retrieved:', downloadUrl, 'Filename:', actualFilename);
        }
        
        if (!downloadUrl) {
          throw new Error('No download URL found');
        }
        
        // Track download in database first
        console.log('📊 Inserting download tracking record...');
        const { error: trackingError } = await supabase
          .from('download_tracking')
          .insert({
            project_id: projectId,
            file_id: fileId || null,
            addon_id: addonId || null,
            user_agent: navigator.userAgent.substring(0, 500),
            downloaded_at: new Date().toISOString()
          });
        
        if (trackingError) {
          console.error('❌ Download tracking failed:', trackingError);
          showErrorToast(projectName, trackingError.message);
          return { success: false, error: trackingError.message };
        }
        
        console.log('✅ Download tracked successfully');
        
        // Start download
        const downloadSuccess = downloadFile(downloadUrl, actualFilename);
        if (downloadSuccess) {
          showSuccessToast(projectName, versionInfo);
          console.log('✅ Download completed successfully');
          
          // Invalidate React Query cache to refresh all data
          await invalidateQueries(projectId);
          
          // Dispatch custom event for immediate UI updates
          window.dispatchEvent(new CustomEvent('downloadCompleted', { 
            detail: { projectId, fileId, addonId } 
          }));
          
          return { success: true, downloadUrl, fileName: actualFilename };
        } else {
          console.log('❌ Download file process failed');
          showErrorToast(projectName, 'Failed to start download');
          return { success: false, error: 'Download failed' };
        }
        
      } catch (error) {
        console.error('❌ Download tracking failed:', error);
        showErrorToast(projectName, error instanceof Error ? error.message : 'Unknown error');
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      } finally {
        // Reset the download lock after a short delay
        setTimeout(() => {
          downloadInProgress = false;
        }, 1000);
      }
    },
    [toast, queryClient]
  );

  const handleDownload = trackDownload; // Keep backward compatibility

  return { handleDownload, trackDownload };
};
