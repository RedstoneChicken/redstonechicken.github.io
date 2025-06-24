
import { useState, useEffect, memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLayoutInfo } from '@/hooks/useLayoutInfo';
import HeroSection from "@/components/home/HeroSection";
import FeaturedVideosSection from "@/components/home/FeaturedVideosSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import JoinCommunitySection from "@/components/home/JoinCommunitySection";

const Home = memo(() => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { navbarHeight } = useLayoutInfo();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-transparent animate-optimized-fade-in gpu-accelerated">
      <HeroSection />

      {/* Divider */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>

      {/* Content sections with optimized spacing */}
      <div className="space-y-8 py-16 performance-container">
        <FeaturedVideosSection />
        <FeaturedProjectsSection />
        <JoinCommunitySection />
      </div>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
