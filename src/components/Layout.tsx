
import { ReactNode, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import ScrollToDownloadButton from './ScrollToDownloadButton';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Force scroll reset on every navigation
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Immediate scroll reset
    const scrollReset = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scrollReset();
    requestAnimationFrame(scrollReset);
    setTimeout(scrollReset, 0);
  }, [location.pathname]);

  // Add page-specific classes with consistent preloading
  const getPageClass = () => {
    const baseClasses = 'min-h-screen flex flex-col font-montserrat opacity-100';
    if (location.pathname.includes('/youtube')) return `${baseClasses} youtube-page`;
    if (location.pathname.includes('/project')) return `${baseClasses} project-detail-page`;
    if (location.pathname.includes('/downloads')) return `${baseClasses} downloads-page`;
    if (location.pathname.includes('/support')) return `${baseClasses} support-page`;
    return baseClasses;
  };
  
  return (
    <div className={getPageClass()}>
      <ScrollToTop />
      
      {/* Stabilized background decorations - no flash */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-100">
        {/* Primary stable glow */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(60vw,800px)] h-[min(60vh,600px)] 
                     bg-gradient-radial from-primary/6 to-transparent rounded-full opacity-100"
          style={{ filter: 'blur(120px)' }}
        />
        
        {/* Floating background shapes - stable */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-primary/3 rounded-full opacity-60" style={{ filter: 'blur(80px)' }} />
        <div className="absolute top-60 right-20 w-32 h-32 bg-secondary/3 rounded-full opacity-40" style={{ filter: 'blur(60px)' }} />
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-accent/3 rounded-full opacity-30" style={{ filter: 'blur(40px)' }} />
      </div>
      
      <Navbar />
      
      {/* Main content with stable loading */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-6 px-6 relative z-10 navbar-spacing opacity-100">
        <div className="opacity-100 transform-none">
          {children}
        </div>
      </main>
      
      <ScrollToTopButton />
      <ScrollToDownloadButton />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
