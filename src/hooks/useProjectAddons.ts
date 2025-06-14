
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type ProjectAddon = Tables<'project_addons'>;

export const useProjectAddons = (projectId: string) => {
  return useQuery({
    queryKey: ['project-addons', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      
      const { data, error } = await supabase
        .from('project_addons')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching project addons:', error);
        throw error;
      }
      
      console.log('Fetched project addons:', data);
      return data || [];
    },
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
