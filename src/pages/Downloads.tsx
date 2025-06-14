import { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useProjects } from '@/hooks/useProjects';
import DownloadsHero from '@/components/downloads/DownloadsHero';
import DownloadsFilters from '@/components/downloads/DownloadsFilters';
import DownloadsResults from '@/components/downloads/DownloadsResults';
import DownloadsPagination from '@/components/downloads/DownloadsPagination';

const ITEMS_PER_PAGE = 12;

const Downloads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('total_download_count');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: projects, isLoading, error } = useProjects();

  useEffect(() => {
    document.title = "Downloads - RedstoneChicken MC";
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedVersions, sortBy, sortOrder]);

  // Get unique MC versions from all projects and format them
  const mcVersionOptions = useMemo(() => {
    if (!projects) return [];
    
    const versions = new Set<string>();
    projects.forEach(project => {
      project.mc_versions.forEach(version => {
        // Extract major version (e.g., "1.21" from "1.21.0")
        const majorVersion = version.match(/^\d+\.\d+/)?.[0];
        if (majorVersion) {
          versions.add(`${majorVersion}.x`);
        }
      });
    });
    
    const sortedVersions = Array.from(versions).sort((a, b) => {
      const aNum = parseFloat(a.replace(/[^\d.]/g, ''));
      const bNum = parseFloat(b.replace(/[^\d.]/g, ''));
      return bNum - aNum;
    });

    return sortedVersions.map(version => ({ value: version, label: version }));
  }, [projects]);

  // Filter and sort projects
  const { filteredProjects, paginatedProjects, totalPages } = useMemo(() => {
    if (!projects) return { filteredProjects: [], paginatedProjects: [], totalPages: 0 };
    
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Fix the type filtering to properly handle resource_pack
      const matchesType = selectedType === 'all' || 
                         (selectedType === 'resource_pack' && project.type === 'resource_pack') ||
                         (selectedType === 'mod' && project.type === 'mod');
      
      let matchesVersions = true;
      if (selectedVersions.length > 0) {
        matchesVersions = selectedVersions.some(selectedVersion => {
          const majorVersion = selectedVersion.replace('.x', '');
          return project.mc_versions.some(projectVersion => 
            projectVersion.startsWith(majorVersion)
          );
        });
      }
      
      return matchesSearch && matchesType && matchesVersions;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'total_download_count':
          comparison = (a.total_download_count || 0) - (b.total_download_count || 0);
          break;
        case 'updated_at':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { filteredProjects: filtered, paginatedProjects, totalPages };
  }, [projects, searchQuery, selectedType, selectedVersions, sortBy, sortOrder, currentPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedVersions([]);
    setSortBy('total_download_count');
    // Don't reset sortOrder - exclude from clear filters
    setCurrentPage(1);
  };

  // Updated logic: exclude sortOrder from hasActiveFilters
  const hasActiveFilters = Boolean(
    searchQuery || 
    selectedType !== 'all' || 
    selectedVersions.length > 0 || 
    sortBy !== 'total_download_count'
  );

  if (error) {
    console.error('Downloads page error:', error);
    return (
      <div className="min-h-screen bg-background font-montserrat flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-montserrat text-gradient-red">Error Loading Projects</h1>
          <p className="text-muted-foreground font-montserrat">There was an error loading the projects. Please try again later.</p>
          <Button onClick={() => window.location.reload()} className="font-montserrat hover-scale">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <DownloadsHero/>
      
      <DownloadsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedVersions={selectedVersions}
        setSelectedVersions={setSelectedVersions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        mcVersionOptions={mcVersionOptions}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      <div className="max-w-7xl mx-auto px-6">
        <DownloadsResults
          projects={paginatedProjects}
          isLoading={isLoading}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />
        
        <DownloadsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Downloads;
