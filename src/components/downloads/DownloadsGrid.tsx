
import OptimizedProjectCard from '@/components/OptimizedProjectCard';
import { Project } from '@/hooks/useProjects';

interface DownloadsGridProps {
  projects: Project[];
  isLoading: boolean;
}

const DownloadsGrid = ({ projects, isLoading }: DownloadsGridProps) => {
  if (isLoading) {
    return (
      <div className="tiles-grid">
        {[...Array(8)].map((_, i) => (
          <OptimizedProjectCard key={i} project={{} as any} loading={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="tiles-grid">
      {projects.map((project) => (
        <OptimizedProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default DownloadsGrid;
