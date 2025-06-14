
import { projects } from './projectsData';

export interface ProjectFilters {
  searchQuery?: string;
  type?: string;
  versions?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const filterAndSortProjects = (filters: ProjectFilters) => {
  const {
    searchQuery = '',
    type = 'all',
    versions = [],
    sortBy = 'downloadCount',
    sortOrder = 'desc'
  } = filters;

  let filtered = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = type === 'all' || project.type === type;
    
    let matchesVersions = true;
    if (versions.length > 0) {
      matchesVersions = versions.some(selectedVersion => {
        const majorVersion = selectedVersion.replace('.x', '');
        return project.mcVersions.some(projectVersion => 
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
      case 'downloadCount':
        comparison = a.downloadCount - b.downloadCount;
        break;
      case 'lastUpdated':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        break;
      case 'publishDate':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return filtered;
};

export const getLatestProjects = (count: number = 3) => {
  return projects
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, count);
};

export const getProjectsByType = (type: 'mod' | 'resource_pack') => {
  return projects.filter(project => project.type === type);
};

export const getMostDownloadedProjects = (count: number = 5) => {
  return projects
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, count);
};
