
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-border/40">
      <div className="bg-muted/30 backdrop-blur-sm py-12 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://yt3.googleusercontent.com/ytc/AIdro_mhEBuRNDkRxOWUjeZflxfdyutxSHfzuEOhEAtTW8VVp_I=s900-c-k-c0x00ffffff-no-rj" 
                  alt="Redstone Chicken" 
                  className="w-10 h-10 rounded-xl" 
                />
                <span className="text-xl font-bold text-foreground font-montserrat">Redstone Chicken</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md font-montserrat leading-relaxed text-left">
                Creating amazing Minecraft mods, resource packs, and content to enhance your gameplay experience.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild className="bg-muted/20 border-border/40 text-foreground hover:bg-muted/40 hover:text-foreground backdrop-blur-sm transition-all duration-300">
                  <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="bg-muted/20 border-border/40 text-foreground hover:bg-muted/40 hover:text-foreground backdrop-blur-sm transition-all duration-300">
                  <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Discord
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-foreground font-semibold mb-4 font-montserrat text-left">Quick Links</h3>
              <div className="space-y-3 text-left">
                <Link to="/downloads" className="block text-muted-foreground hover:text-foreground transition-colors font-montserrat">
                  Downloads
                </Link>
                <Link to="/youtube" className="block text-muted-foreground hover:text-foreground transition-colors font-montserrat">
                  YouTube Channel
                </Link>
                <Link to="/support" className="block text-muted-foreground hover:text-foreground transition-colors font-montserrat">
                  Support & Help
                </Link>
              </div>
            </div>
          </div>

          {/* Gradient Divider */}
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent mt-8"></div>

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
