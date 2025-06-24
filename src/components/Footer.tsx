
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-border/20">
      <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl py-12 w-full overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 pointer-events-none"></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 group">
                <div className="relative">
                  <img 
                    src="https://yt3.googleusercontent.com/ytc/AIdro_mhEBuRNDkRxOWUjeZflxfdyutxSHfzuEOhEAtTW8VVp_I=s900-c-k-c0x00ffffff-no-rj" 
                    alt="Redstone Chicken" 
                    className="w-10 h-10 rounded-xl transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-xl font-bold text-foreground font-montserrat group-hover:text-primary transition-colors duration-300">
                  Redstone Chicken
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md font-montserrat leading-relaxed text-left">
                Creating amazing Minecraft mods, resource packs, and content to enhance your gameplay experience.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild className="group bg-background/30 backdrop-blur-md border-border/40 text-foreground hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                  <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    YouTube
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="group bg-background/30 backdrop-blur-md border-border/40 text-foreground hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                  <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Discord
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-foreground font-semibold mb-4 font-montserrat text-left">Quick Links</h3>
              <div className="space-y-3 text-left">
                <Link to="/downloads" className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-montserrat relative group">
                  <span className="relative z-10">Downloads</span>
                  <div className="absolute inset-0 bg-primary/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1 px-2 py-1"></div>
                </Link>
                <Link to="/youtube" className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-montserrat relative group">
                  <span className="relative z-10">YouTube Channel</span>
                  <div className="absolute inset-0 bg-primary/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1 px-2 py-1"></div>
                </Link>
                <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-montserrat relative group">
                  <span className="relative z-10">Support & Help</span>
                  <div className="absolute inset-0 bg-primary/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1 px-2 py-1"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Gradient Divider */}
          <div className="relative w-full h-[2px] mt-8 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"></div>
          </div>

          <div className="pt-6 space-y-3 text-center">
            <p className="text-foreground/90 font-montserrat text-sm font-medium">Not associated with Mojang or Microsoft.</p>
            <p className="text-muted-foreground font-montserrat text-sm">
              © 2024 Redstone Chicken. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
