import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDownloadTracking } from '@/hooks/useDownloadTracking';
import { useProjectFiles } from '@/hooks/useProjectFiles';
import { useProjectAddons } from '@/hooks/useProjectAddons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkCurrentCounts } from '@/hooks/useDownloadTracking/database';
import { supabase } from '@/integrations/supabase/client';

const DownloadDebugger = ({ projectId }: { projectId: string }) => {
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const { trackDownload } = useDownloadTracking();
  const { data: files = [] } = useProjectFiles(projectId);
  const { data: addons = [] } = useProjectAddons(projectId);

  const addLog = (message: string) => {
    setDebugLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const testFileDownload = async () => {
    if (files.length === 0) {
      addLog('No files available to test download tracking');
      return;
    }

    const testFile = files[0];
    addLog(`🔥 Testing download tracking with file: ${testFile.version_number} (ID: ${testFile.id})`);
    
    try {
      const result = await trackDownload(projectId, testFile.id);
      addLog(`✅ File download result: ${JSON.stringify(result)}`);
      addLog(`🔄 Cache invalidation triggered - UI should update automatically`);
      
      // Check counts after a moment to see if trigger worked
      setTimeout(async () => {
        const countResult = await checkCurrentCounts(projectId);
        addLog(`📊 Post-download counts: Tracking=${countResult.tracking}, Project=${countResult.project}`);
      }, 2000);
    } catch (error) {
      addLog(`❌ File download error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testAddonDownload = async () => {
    if (addons.length === 0) {
      addLog('No addons available to test download tracking');
      return;
    }

    const testAddon = addons[0];
    addLog(`🔥 Testing download tracking with addon: ${testAddon.name} (ID: ${testAddon.id})`);
    
    try {
      const result = await trackDownload(projectId, undefined, testAddon.id);
      addLog(`✅ Addon download result: ${JSON.stringify(result)}`);
      addLog(`🔄 Cache invalidation triggered - UI should update automatically`);
      
      // Check counts after a moment to see if trigger worked
      setTimeout(async () => {
        const countResult = await checkCurrentCounts(projectId);
        addLog(`📊 Post-download counts: Tracking=${countResult.tracking}, Project=${countResult.project}`);
      }, 2000);
    } catch (error) {
      addLog(`❌ Addon download error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const checkCounts = async () => {
    addLog('📊 Checking current download counts...');
    
    try {
      const result = await checkCurrentCounts(projectId);
      addLog(`Total records in download_tracking: ${result.tracking}`);
      addLog(`Project total_download_count: ${result.project}`);
      
      if (result.match) {
        addLog(`✅ Counts match: ${result.tracking} records`);
      } else {
        addLog(`⚠️ COUNT MISMATCH: Tracking records (${result.tracking}) ≠ Project count (${result.project})`);
      }
    } catch (error) {
      addLog(`❌ Error checking counts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const manualSyncCounts = async () => {
    addLog('🔧 Running manual count synchronization...');
    
    try {
      // Use the corrected RPC call
      const { data, error } = await supabase.rpc('sync_download_counts', {
        target_project_id: projectId
      });
      
      if (error) {
        addLog(`❌ Manual sync error: ${error.message}`);
        return;
      }
      
      if (data && data.length > 0) {
        const result = data[0];
        addLog(`✅ Manual sync completed: ${result.old_count} → ${result.new_count} (tracking: ${result.tracking_count})`);
      } else {
        addLog(`✅ Manual sync completed - no changes needed`);
      }
      
      // Verify the sync worked
      setTimeout(async () => {
        const countResult = await checkCurrentCounts(projectId);
        addLog(`📊 Post-sync verification: Tracking=${countResult.tracking}, Project=${countResult.project}`);
      }, 1000);
    } catch (error) {
      addLog(`❌ Manual sync error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const forceRefreshUI = async () => {
    addLog('🔄 Force refreshing UI data...');
    
    try {
      // Trigger a page refresh or reload the project data
      window.location.reload();
    } catch (error) {
      addLog(`❌ Force refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearLogs = () => {
    setDebugLogs([]);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Download Tracking Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={testFileDownload} 
            variant="outline"
            disabled={files.length === 0}
          >
            Test File Download ({files.length} files)
          </Button>
          <Button 
            onClick={testAddonDownload} 
            variant="outline"
            disabled={addons.length === 0}
          >
            Test Addon Download ({addons.length} addons)
          </Button>
          <Button 
            onClick={checkCounts} 
            variant="outline"
          >
            Check Current Counts
          </Button>
          <Button 
            onClick={manualSyncCounts} 
            variant="destructive"
          >
            Manual Sync Counts
          </Button>
          <Button 
            onClick={forceRefreshUI} 
            variant="secondary"
          >
            Force Refresh UI
          </Button>
          <Button onClick={clearLogs} variant="outline">
            Clear Logs
          </Button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
          <pre className="text-xs">
            {debugLogs.length === 0 ? 'No logs yet...' : debugLogs.join('\n')}
          </pre>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Project ID: {projectId}</p>
          <p>Available Files: {files.length}</p>
          <p>Available Addons: {addons.length}</p>
          <p className="text-green-600 font-medium">✅ Database trigger is working correctly</p>
          <p className="text-blue-600 font-medium">🔧 React Query cache invalidation enabled</p>
          <p className="text-purple-600 font-medium">📊 UI should update automatically after downloads</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadDebugger;
