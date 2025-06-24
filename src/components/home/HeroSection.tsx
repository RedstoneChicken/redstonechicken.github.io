import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return <section className="relative py-20 px-6 overflow-visible ">
      {/* Enhanced AI-style background effects */}
      <div className="absolute inset-0 z-[-10]">
        {/* Primary glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        {/* Secondary accent glows */}
        <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-floating-glow"></div>
        <div className="absolute right-1/4 bottom-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] animate-floating-glow" style={{
        animationDelay: '2s'
      }}></div>
        {/* Grid overlay for AI aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-fade-in">
          Welcome to<br />
          <span className="text-primary relative">
            Redstone Chicken
            <div className="absolute inset-0 text-primary blur-xl opacity-50 animate-pulse-slow"></div>
          </span>
        </h1>
        <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Home to <span className="text-gradient-red font-semibold">Minecraft mods</span>, resource packs, and video content
          by Redstone Chicken. <span className="text-gradient-red font-semibold">Enhance your gameplay</span> with custom creations.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="px-6 py-4 text-base font-semibold font-montserrat group relative overflow-hidden">
            <Link to="/downloads" className="flex items-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Download className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Browse Downloads</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="hover:bg-primary/10 px-6 py-4 text-base font-montserrat group relative overflow-hidden backdrop-blur-md bg-background/20 border-primary/30 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20">
            <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Youtube className="h-5 w-5 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Watch on YouTube</span>
              <div className="absolute inset-0 rounded-md bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </Button>
        </div>
      </div>
    </section>;
};
export default HeroSection;