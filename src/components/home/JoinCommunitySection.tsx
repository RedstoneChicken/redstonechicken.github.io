
import { Button } from "@/components/ui/button";
import { Youtube, MessageCircle } from "lucide-react";

const JoinCommunitySection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-left text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Join Our <span className="text-primary relative">
            Community
            <div className="absolute inset-0 text-primary blur-lg opacity-30"></div>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" 
            className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors duration-300 flex-shrink-0">
              <MessageCircle className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex-1 text-center sm:text-left relative z-10">
              <h3 className="text-lg font-semibold font-montserrat group-hover:text-indigo-300 transition-colors duration-300">Discord Server</h3>
              <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                Join our Discord for <span className="text-gradient-red">support</span>, updates, and chat with other players
              </p>
            </div>
            
            <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:text-indigo-300 flex-shrink-0">
              Join
            </Button>
          </a>
          
          <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer"
            className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 flex-shrink-0">
              <Youtube className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex-1 text-center sm:text-left relative z-10">
              <h3 className="text-lg font-semibold font-montserrat group-hover:text-primary transition-colors duration-300">YouTube Channel</h3>
              <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                Watch <span className="text-gradient-red">tutorials</span>, showcases, and updates about our mods
              </p>
            </div>
            
            <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-primary/30 hover:border-primary/60 hover:bg-primary/10 hover:text-primary flex-shrink-0">
              Subscribe
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
