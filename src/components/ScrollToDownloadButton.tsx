import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToDownloadButton = () => {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  // Only show on project detail pages
  const isProjectPage = location.pathname.includes('/project/');
  
  // Check if we're in mobile layout (including tablets in mobile view)
  useEffect(() => {
    const checkLayout = () => {
      const isSmallScreen = window.innerWidth < 1024; // lg breakpoint
      setIsMobileLayout(isSmallScreen);
    };
    
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);
  
  useEffect(() => {
    if (!isProjectPage || !isMobileLayout) {
      setShowButton(false);
      return;
    }
    
    const handleScroll = () => {
      const downloadSection = document.getElementById('download-section');
      if (downloadSection) {
        const rect = downloadSection.getBoundingClientRect();
        const downloadSectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setShowButton(!downloadSectionVisible);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectPage, isMobileLayout]);
  
  const scrollToDownload = useCallback(() => {
    const downloadSection = document.getElementById('download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!showButton || !isProjectPage || !isMobileLayout) {
    return null;
  }

  return (
    <Button
      onClick={scrollToDownload}
      size="icon"
      className="fixed bottom-6 left-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 shadow-2xl border border-primary/30 backdrop-blur-sm animate-fade-in hover:scale-110 transition-all duration-300"
      aria-label="Scroll to downloads"
    >
      <Download className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToDownloadButton;
