
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Home, Youtube, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [titleFontSize, setTitleFontSize] = useState('text-2xl');
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Dynamic font size adjustment for mobile
  useEffect(() => {
    if (!isMobile) {
      setTitleFontSize(scrollY > 50 ? 'text-lg' : 'text-2xl');
      return;
    }

    const checkTitleFit = () => {
      const titleElement = document.getElementById('navbar-title');
      if (!titleElement) return;

      const container = titleElement.parentElement;
      if (!container) return;

      const containerWidth = container.offsetWidth - 60; // Account for logo and padding
      titleElement.className = titleElement.className.replace(/text-\w+/, 'text-2xl');
      
      if (titleElement.scrollWidth > containerWidth) {
        titleElement.className = titleElement.className.replace(/text-\w+/, 'text-xl');
        
        if (titleElement.scrollWidth > containerWidth) {
          titleElement.className = titleElement.className.replace(/text-\w+/, 'text-lg');
          
          if (titleElement.scrollWidth > containerWidth) {
            titleElement.className = titleElement.className.replace(/text-\w+/, 'text-base');
          }
        }
      }
    };

    // Check on mount and resize
    const timer = setTimeout(checkTitleFit, 100);
    window.addEventListener('resize', checkTitleFit);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkTitleFit);
    };
  }, [isMobile, scrollY]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Downloads', path: '/downloads', icon: Download },
    { name: 'YouTube', path: '/youtube', icon: Youtube },
    { name: 'Support', path: '/support', icon: HelpCircle },
  ];

  const isScrolled = scrollY > 50;
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out border-b border-border/10 ${
        isScrolled 
          ? 'bg-background/10 backdrop-blur-xl shadow-2xl shadow-primary/5' 
          : 'bg-background/5 backdrop-blur-lg'
      }`}
      style={{ 
        position: 'fixed',
        top: '0px',
        zIndex: 9999
      }}
    >
      {/* AI-style ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
      
      <div className={`max-w-7xl mx-auto transition-all duration-500 relative ${
        isScrolled ? 'px-4 py-2' : 'px-6 py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-all duration-300 p-2 rounded-xl hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 min-w-0 group backdrop-blur-sm"
          >
            <div className="relative">
              <img 
                src="https://yt3.googleusercontent.com/ytc/AIdro_mhEBuRNDkRxOWUjeZflxfdyutxSHfzuEOhEAtTW8VVp_I=s900-c-k-c0x00ffffff-no-rj"
                alt="Redstone Chicken"
                className={`rounded-xl transition-all duration-300 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/30 ${
                  isScrolled ? 'w-8 h-8' : 'w-12 h-12'
                }`}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {!isMobile && (
              <span 
                id="navbar-title"
                className={`font-bold font-montserrat transition-all duration-300 whitespace-nowrap group-hover:text-primary ${
                  isScrolled ? 'text-lg' : 'text-2xl'
                }`}
              >
                Redstone Chicken
              </span>
            )}
          </Link>

          {/* Desktop Navigation - Changed from md:flex to lg:flex */}
          <div className={`hidden lg:flex items-center transition-all duration-500 ${
            isScrolled ? 'space-x-2' : 'space-x-6'
          }`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  size={isScrolled ? "sm" : "default"}
                  asChild
                  className={`font-montserrat rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'shadow-lg shadow-primary/30 border border-primary/30' 
                      : 'border border-transparent hover:border-primary/20'
                  } ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'}`}
                >
                  <Link to={item.path} className="flex items-center gap-2 relative group">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button - Changed from md:hidden to lg:hidden */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden rounded-xl transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 flex-shrink-0 backdrop-blur-sm border border-transparent hover:border-primary/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu - Changed from md:hidden to lg:hidden */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/20 backdrop-blur-xl rounded-b-xl animate-slideDown border border-border/20 shadow-2xl shadow-primary/10 mt-2">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-b-xl" />
            <div className="px-2 pt-2 pb-3 space-y-1 relative">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={`w-full justify-start font-montserrat rounded-xl transition-all duration-300 transform-gpu ${
                      isActive 
                        ? 'shadow-lg shadow-primary/30 border border-primary/30' 
                        : 'border border-transparent hover:border-primary/20 hover:scale-[1.02]'
                    }`}
                  >
                    <Link to={item.path} className="flex items-center gap-2 relative group">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
