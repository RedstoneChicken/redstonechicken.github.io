
import { supabase } from '@/integrations/supabase/client';

export const testDatabaseConnection = async (projectId: string) => {
  console.log('Testing Supabase connection...');
  const { data: connectionTest, error: connectionError } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .single();

  if (connectionError) {
    console.error('Supabase connection error:', connectionError);
    throw new Error(`Database connection failed: ${connectionError.message}`);
  }

  if (!connectionTest) {
    console.error('Project not found:', projectId);
    throw new Error('Project not found');
  }

  console.log('✅ Supabase connection verified, project exists');
  return connectionTest;
};

export const fetchFileData = async (fileId: string) => {
  console.log('Fetching file data for fileId:', fileId);
  const { data: fileData, error: fileError } = await supabase
    .from('project_files')
    .select('file_url, file_name, version_number')
    .eq('id', fileId)
    .single();
  
  if (fileError) {
    console.error('File fetch error:', fileError);
    throw new Error(`File not found: ${fileError.message}`);
  }
  
  console.log('File data retrieved:', fileData);
  return fileData;
};

export const fetchAddonData = async (addonId: string) => {
  console.log('Fetching addon data for addonId:', addonId);
  const { data: addonData, error: addonError } = await supabase
    .from('project_addons')
    .select('file_url, name')
    .eq('id', addonId)
    .single();
  
  if (addonError) {
    console.error('Addon fetch error:', addonError);
    throw new Error(`Addon not found: ${addonError.message}`);
  }
  
  console.log('Addon data retrieved:', addonData);
  return addonData;
};

export const insertDownloadRecord = async (
  projectId: string,
  fileId?: string,
  addonId?: string
) => {
  console.log('Inserting download tracking record...');
  const insertData = {
    project_id: projectId,
    file_id: fileId || null,
    addon_id: addonId || null,
    user_agent: navigator.userAgent.substring(0, 500),
    downloaded_at: new Date().toISOString()
  };
  
  console.log('Insert data:', insertData);

  const { data, error: trackingError } = await supabase
    .from('download_tracking')
    .insert(insertData)
    .select('*');

  if (trackingError) {
    console.error('Download tracking insert failed:', trackingError);
    throw new Error(`Failed to track download: ${trackingError.message}`);
  }

  console.log('✅ Download tracking record inserted successfully:', data);
  console.log('✅ Database trigger automatically updates all counts');
  
  return data;
};

export const checkCurrentCounts = async (projectId: string) => {
  console.log('Checking current download counts...');
  
  try {
    // Get total downloads from download_tracking table
    const { data: trackingData, error: trackingError } = await supabase
      .from('download_tracking')
      .select('id')
      .eq('project_id', projectId);

    if (trackingError) {
      console.error('Error fetching tracking data:', trackingError);
      throw trackingError;
    }

    const totalDownloads = trackingData?.length || 0;
    console.log('Total downloads from tracking table:', totalDownloads);

    // Check project total_download_count
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('total_download_count')
      .eq('id', projectId)
      .single();

    if (projectError) {
      console.error('Error fetching project data:', projectError);
      throw projectError;
    }

    const projectCount = projectData?.total_download_count || 0;
    console.log('Project total_download_count:', projectCount);

    // Check if counts match
    if (totalDownloads !== projectCount) {
      console.log(`⚠️ COUNT MISMATCH: Tracking records (${totalDownloads}) ≠ Project count (${projectCount})`);
      return { tracking: totalDownloads, project: projectCount, match: false };
    } else {
      console.log(`✅ Counts match: ${totalDownloads} records`);
      return { tracking: totalDownloads, project: projectCount, match: true };
    }
  } catch (error) {
    console.error('Error in checkCurrentCounts:', error);
    throw error;
  }
};
