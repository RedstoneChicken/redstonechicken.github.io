
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
import ClearFiltersButton from "./ClearFiltersButton";

interface DownloadsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedVersions: string[];
  setSelectedVersions: (versions: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  mcVersionOptions: Array<{ value: string; label: string }>;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const DownloadsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedVersions,
  setSelectedVersions,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  mcVersionOptions,
  hasActiveFilters,
  clearFilters
}: DownloadsFiltersProps) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex flex-col items-center space-y-4">
          <FilterControls
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedVersions={selectedVersions}
            setSelectedVersions={setSelectedVersions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            mcVersionOptions={mcVersionOptions}
          />

          <ClearFiltersButton
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadsFilters;
