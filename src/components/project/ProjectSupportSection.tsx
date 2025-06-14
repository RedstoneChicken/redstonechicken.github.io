import { Button } from "@/components/ui/button";
import { Code, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectSupportSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-left">Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl text-left">
            Having trouble with installation or found a bug? We're here to help! Check out our support resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" className="interactive-element">
              <Link to="/support" className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Installation Guide
              </Link>
            </Button>
            <Button asChild variant="outline" className="interactive-element">
              <a href="https://discord.gg/redstone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Join Discord
              </a>
            </Button>
            <Button asChild className="red-glow interactive-element">
              <Link to="/support" className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Get Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSupportSection;
