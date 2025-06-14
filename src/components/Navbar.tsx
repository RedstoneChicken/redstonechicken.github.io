
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 relative ${
        isScrolled ? 'px-4 py-2' : 'px-6 py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-all duration-300 p-2 rounded-xl hover:bg-primary/10 min-w-0"
          >
            <img 
              src="https://yt3.googleusercontent.com/ytc/AIdro_mhEBuRNDkRxOWUjeZflxfdyutxSHfzuEOhEAtTW8VVp_I=s900-c-k-c0x00ffffff-no-rj"
              alt="Redstone Chicken"
              className={`rounded-xl transition-all duration-300 flex-shrink-0 ${
                isScrolled ? 'w-8 h-8' : 'w-12 h-12'
              }`}
            />
            {!isMobile && (
              <span 
                id="navbar-title"
                className={`font-bold font-montserrat transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? 'text-lg' : 'text-2xl'
                }`}
              >
                Redstone Chicken
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center transition-all duration-500 ${
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
                  className={`font-montserrat rounded-xl transition-all duration-300 red-border-hover ${
                    isActive 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  } ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'}`}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden rounded-xl transition-all duration-300 hover:bg-primary/10 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Positioned absolutely to not affect navbar height */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto">
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
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-primary/10 hover:text-primary hover:scale-[1.02]'
                  }`}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
