import { useState } from 'react';
import { Button } from "@/components/ui/button";
import DownloadsGrid from "./DownloadsGrid";
import { FilterX } from "lucide-react";
import type { Project } from '@/hooks/useProjects';
interface DownloadsResultsProps {
  projects: Project[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}
const DownloadsResults = ({
  projects,
  isLoading,
  hasActiveFilters,
  clearFilters
}: DownloadsResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);
  if (isLoading) {
    return <div className="mb-12">
        <div className="mb-6">
          <div className="h-8 w-48 bg-muted rounded-xl animate-pulse"></div>
        </div>
        <DownloadsGrid projects={[]} isLoading={true} />
      </div>;
  }
  return <div className="overflow-visible">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {projects.length} Project{projects.length !== 1 ? 's' : ''} Found
        </h2>
        
        {hasActiveFilters}
      </div>

      {/* Results Grid */}
      {projects.length === 0 ? <div className="text-center glass-panel rounded-xl p-8">
          <p className="text-muted-foreground font-montserrat text-xl mb-4">
            No projects found matching your criteria.
          </p>
          <p className="text-muted-foreground font-montserrat text-base mb-6">
            Try adjusting your search or filter settings.
          </p>
          {hasActiveFilters && <Button onClick={clearFilters} className="red-glow">
              Clear All Filters
            </Button>}
        </div> : <div className="overflow-visible">
          <div className="grid-container overflow-visible">
            <DownloadsGrid projects={currentProjects} isLoading={false} />
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && <div className="flex justify-center items-center gap-2 mt-8">
              <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="rounded-xl">
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({
            length: totalPages
          }, (_, i) => i + 1).map(page => <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="rounded-xl">
                    {page}
                  </Button>)}
              </div>
              
              <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="rounded-xl">
                Next
              </Button>
            </div>}
        </div>}
    </div>;
};
export default DownloadsResults;