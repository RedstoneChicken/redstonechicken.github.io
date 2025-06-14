
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration completely
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Multiple methods to ensure scroll reset works
    const scrollToTop = () => {
      // Method 1: Direct scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 2: Force scroll with behavior
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Method 3: Set scroll properties directly
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.style.scrollBehavior = '';
    };

    // Execute immediately
    scrollToTop();
    
    // Execute on next frame
    requestAnimationFrame(scrollToTop);
    
    // Execute after a short delay as backup
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
