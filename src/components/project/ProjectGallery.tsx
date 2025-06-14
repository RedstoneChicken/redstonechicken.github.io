
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ModernImageGallery from '@/components/ModernImageGallery';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon } from 'lucide-react';

interface ProjectGalleryProps {
  projectId: string;
  projectName: string;
}

const ProjectGallery = ({ projectId, projectName }: ProjectGalleryProps) => {
  const { data: galleryImages, isLoading } = useQuery({
    queryKey: ['project-gallery', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_gallery')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-left">Gallery</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-left">Gallery</h2>
        </div>
        <div className="glass-panel p-8 rounded-xl text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No gallery images available for this project</p>
        </div>
      </div>
    );
  }

  const media = galleryImages.map((image, index) => ({
    url: image.image_url,
    type: "image" as const,
    description: image.title || image.description || `${projectName} - Image ${index + 1}`
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold text-left">Gallery</h2>
      </div>
      <ModernImageGallery media={media} variant="inline" />
    </div>
  );
};

export default ProjectGallery;
