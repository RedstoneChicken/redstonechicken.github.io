
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface FloatingDownloadButtonProps {
  targetId: string;
}

const FloatingDownloadButton = ({ targetId }: FloatingDownloadButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const scrollToDownload = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Only render on mobile devices
  if (!isMobile) {
    return null;
  }
  
  return (
    <button
      onClick={scrollToDownload}
      className="fixed bottom-6 right-6 z-50 bg-primary rounded-full p-4 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-transform active:scale-95"
      aria-label="Download mod"
    >
      <Download className="h-5 w-5 text-white" />
      <span className="sr-only">Download</span>
    </button>
  );
};

export default FloatingDownloadButton;
