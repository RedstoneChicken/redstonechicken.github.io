
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ImageIcon, Clock } from "lucide-react";
import CommonMarkRenderer from "@/components/CommonMarkRenderer";
import ProjectVersionHistory from "./ProjectVersionHistory";
import ProjectGallery from "./ProjectGallery";

interface ProjectFile {
  id: string;
  version_number: string;
  mc_versions: string[];
  file_url: string;
  file_size?: number;
  is_primary: boolean;
  created_at: string;
  file_name?: string;
}

interface ProjectContentProps {
  project: {
    name: string;
    description_rich?: string;
    description: string;
    image_url?: string;
    id: string;
    description_images?: string[];
    gallery_image_paths?: string[];
    gallery_image_count?: number;
  };
  files: ProjectFile[];
  filesLoading: boolean;
}

const ProjectContent = ({ project, files, filesLoading }: ProjectContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="section-fade-in-5" style={{ animationDelay: "0.4s" }}>
      <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-8 glass-panel rounded-xl">
          <TabsTrigger value="overview" className="rounded-xl flex items-center gap-2 hover-scale-effect">
            <FileText className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl flex items-center gap-2 hover-scale-effect">
            <ImageIcon className="h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="changelog" className="rounded-xl flex items-center gap-2 hover-scale-effect">
            <Clock className="h-4 w-4" />
            Version History
          </TabsTrigger>
        </TabsList>
        
        <div className="min-h-[400px]">
          <TabsContent value="overview" className="animate-fade-in space-y-6 m-0">
            <CommonMarkRenderer 
              content={project.description_rich || project.description} 
              images={project.description_images}
              className="glass-panel p-8 rounded-xl text-left" 
            />
          </TabsContent>
          
          <TabsContent value="gallery" className="animate-fade-in m-0">
            <ProjectGallery projectId={project.id} projectName={project.name} />
          </TabsContent>
          
          <TabsContent value="changelog" className="animate-fade-in m-0">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-left">Version History</h2>
              </div>
              <ProjectVersionHistory files={files} isLoading={filesLoading} projectId={project.id} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProjectContent;
