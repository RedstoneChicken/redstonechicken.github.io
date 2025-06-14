
import { useToast } from '@/hooks/use-toast';

export const useDownloadHandler = () => {
  const { toast } = useToast();

  const initiateDownload = (downloadUrl: string, fileName: string) => {
    try {
      console.log(`🚀 Initiating download: ${fileName} from ${downloadUrl}`);
      
      if (downloadUrl.startsWith('http')) {
        // Open the download URL in a new tab
        console.log('🌐 Opening external URL in new tab');
        const newWindow = window.open(downloadUrl, '_blank', 'noopener,noreferrer');
        
        if (!newWindow) {
          // Fallback if popup blocked
          console.log('🚫 Popup blocked, trying direct navigation');
          window.location.href = downloadUrl;
        }
        
        console.log('✅ Download initiated successfully via new tab');
      } else {
        // For local files, use the download attribute
        console.log('📁 Using download link for local file');
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('✅ Download initiated successfully via download link');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error initiating download:', error);
      showErrorToast(`Failed to start download: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  };

  const showSuccessToast = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `${fileName} download has begun.`,
    });
  };

  const showErrorToast = (error: string) => {
    toast({
      title: "Download Failed", 
      description: `There was an error starting the download: ${error}`,
      variant: "destructive",
    });
  };

  return { initiateDownload, showSuccessToast, showErrorToast };
};
