
import { ReactNode, useLayoutEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import ScrollToDownloadButton from './ScrollToDownloadButton';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Force scroll reset on every navigation
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Immediate scroll reset with performance optimization
    const scrollReset = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scrollReset();
    requestAnimationFrame(scrollReset);
  }, [location.pathname]);

  // Add page-specific classes
  const getPageClass = () => {
    const baseClasses = 'min-h-screen flex flex-col font-montserrat';
    if (location.pathname.includes('/youtube')) return `${baseClasses} youtube-page`;
    if (location.pathname.includes('/project')) return `${baseClasses} project-detail-page`;
    if (location.pathname.includes('/downloads')) return `${baseClasses} downloads-page`;
    if (location.pathname.includes('/support')) return `${baseClasses} support-page`;
    return baseClasses;
  };
  
  return (
    <div className={getPageClass()}>
      <ScrollToTop />
      
      <Navbar />
      
      {/* Main content - Add top padding to account for fixed navbar */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-6 px-6 relative z-10" style={{ paddingTop: '80px' }}>
        <div>
          {children}
        </div>
      </main>
      
      <ScrollToTopButton />
      <ScrollToDownloadButton />
      
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
