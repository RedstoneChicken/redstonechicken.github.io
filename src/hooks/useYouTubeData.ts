
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type YouTubeVideo = Tables<'youtube_videos'>;
export type ChannelStats = Tables<'channel_stats'>;

export const useYouTubeVideos = () => {
  return useQuery({
    queryKey: ['youtube_videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedVideo = () => {
  return useQuery({
    queryKey: ['youtube_videos', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('featured', true)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedVideos = (limit: number = 4) => {
  return useQuery({
    queryKey: ['youtube_videos', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    },
  });
};

export const useChannelStats = () => {
  return useQuery({
    queryKey: ['channel_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('channel_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useLatestVideos = (limit: number = 8) => {
  return useQuery({
    queryKey: ['youtube_videos', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    },
  });
};
