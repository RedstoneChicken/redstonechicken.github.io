
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('🚀 Starting YouTube stats update...')
    
    // Update channel stats (example - you'll need to implement based on your needs)
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=YourChannelName&key=${youtubeApiKey}`
    )
    
    if (channelResponse.ok) {
      const channelData = await channelResponse.json()
      
      if (channelData.items && channelData.items.length > 0) {
        const stats = channelData.items[0].statistics
        
        // Update or insert channel stats
        const { error: statsError } = await supabase
          .from('channel_stats')
          .upsert({
            id: 'main-channel',
            subscribers: parseInt(stats.subscriberCount || '0'),
            total_views: parseInt(stats.viewCount || '0'),
            video_count: parseInt(stats.videoCount || '0'),
            updated_at: new Date().toISOString()
          })
        
        if (statsError) {
          console.error('Error updating channel stats:', statsError)
        } else {
          console.log('✅ Channel stats updated successfully')
        }
      }
    }
    
    // You can add more YouTube API calls here to update video data, etc.
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'YouTube stats updated successfully',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error updating YouTube stats:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
