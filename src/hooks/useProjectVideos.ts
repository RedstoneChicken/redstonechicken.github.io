
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type ProjectVideo = Tables<'project_videos'>;

export const useProjectVideos = (projectId: string) => {
  return useQuery({
    queryKey: ['project-videos', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      
      const { data, error } = await supabase
        .from('project_videos')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching project videos:', error);
        throw error;
      }
      
      console.log('Fetched project videos:', data);
      return data || [];
    },
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
