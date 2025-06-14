
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Project = Tables<'projects'>;
export type ProjectFile = Tables<'project_files'>;

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      
      console.log('Fetched projects:', data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('updated_at', { ascending: false })
        .limit(6); // Limit for performance
      
      if (error) {
        console.error('Error fetching featured projects:', error);
        throw error;
      }
      
      console.log('Fetched featured projects:', data);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useLatestProjects = (limit: number = 3) => {
  return useQuery({
    queryKey: ['projects', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Error fetching latest projects:', error);
        throw error;
      }
      
      console.log('Fetched latest projects:', data);
      return data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes for latest
    gcTime: 10 * 60 * 1000,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['projects', 'slug', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Slug is required');
      }
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle(); // Use maybeSingle to avoid errors when no data found
      
      if (error) {
        console.error('Error fetching project by slug:', error);
        throw error;
      }
      
      console.log('Fetched project by slug:', data);
      return data;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual projects
    gcTime: 15 * 60 * 1000,
  });
};
