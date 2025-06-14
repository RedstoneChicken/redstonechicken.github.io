import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectBySlug } from "@/hooks/useProjects";
import { useProjectVideos } from "@/hooks/useProjectVideos";
import { useProjectFiles } from "@/hooks/useProjectFiles";
import { useProjectAddons } from "@/hooks/useProjectAddons";
import ProjectVideoCarousel from "@/components/project/ProjectVideoCarousel";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectSupportSection from "@/components/project/ProjectSupportSection";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const {
    data: project,
    isLoading: projectLoading,
    error: projectError
  } = useProjectBySlug(slug || '');

  const {
    data: videos = [],
    isLoading: videosLoading
  } = useProjectVideos(project?.id || '');

  const {
    data: files = [],
    isLoading: filesLoading
  } = useProjectFiles(project?.id || '');

  const {
    data: addons = [],
    isLoading: addonsLoading
  } = useProjectAddons(project?.id || '');

  useEffect(() => {
    if (project) {
      document.title = `${project.name} - RedstoneChicken MC`;
    }
    const timer = setTimeout(() => setMediaLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [project]);

  if (projectError) {
    console.error('Project loading error:', projectError);
    return (
      <div className="container px-6 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 text-left">Error Loading Project</h1>
        <p className="text-muted-foreground mb-6 text-left">
          There was an error loading the project. Please try again later.
        </p>
        <Button asChild className="tile-hover-effect transition-all duration-300 red-glow interactive-element">
          <Link to="/downloads">Back to Downloads</Link>
        </Button>
      </div>
    );
  }

  if (projectLoading) {
    return (
      <div className="py-8 animate-fade-in">
        <div className="mb-6">
          <Skeleton className="h-9 w-40 rounded-xl" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 rounded-xl" />
              <Skeleton className="h-6 w-full rounded-xl" />
              <Skeleton className="h-6 w-2/3 rounded-xl" />
            </div>
            <Skeleton className="h-80 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-6 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container px-6 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 text-left">Project Not Found</h1>
        <p className="text-muted-foreground mb-6 text-left">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="tile-hover-effect transition-all duration-300 red-glow interactive-element">
          <Link to="/downloads">Back to Downloads</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in allow-overflow">
      <div className="section-fade-in-1 text-left" style={{ animationDelay: "0s" }}>
        <Button variant="outline" size="sm" asChild className="mb-6 tile-hover-effect transition-all duration-300 rounded-xl interactive-element">
          <Link to="/downloads" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Downloads
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 allow-overflow">
          {/* Main Content - Takes 3/4 of the width */}
          <div className="lg:col-span-3 space-y-8 allow-overflow">
            <ProjectHeader project={project} />
            
            {/* Video Carousel */}
            <div className="section-fade-in-4 allow-overflow" style={{ animationDelay: "0.3s" }}>
              {!mediaLoaded || videosLoading ? (
                <div className="glass-panel rounded-xl overflow-hidden">
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-background">
                      <div className="space-y-4 w-full px-8">
                        <Skeleton className="h-6 w-1/3 mx-auto rounded-xl" />
                        <Skeleton className="h-4 w-2/3 mx-auto rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : videos.length > 0 ? (
                <div className="allow-overflow">
                  <ProjectVideoCarousel videos={videos} />
                </div>
              ) : (
                <div className="glass-panel rounded-xl overflow-hidden p-8">
                  <p className="text-muted-foreground text-left">No videos available for this project</p>
                </div>
              )}
            </div>
            
            <ProjectContent project={project} files={files} filesLoading={filesLoading} />
          </div>
          
          {/* Sidebar - Takes 1/4 of the width */}
          <ProjectSidebar 
            files={files} 
            addons={addons} 
            projectId={project.id}
            showVersionHistory={showVersionHistory}
            setShowVersionHistory={setShowVersionHistory}
          />
        </div>

        <ProjectSupportSection />
      </div>
    </div>
  );
};

export default ProjectDetail;
