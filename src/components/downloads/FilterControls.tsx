
import { ArrowUp, ArrowDown } from "lucide-react";
import FilterButton from "@/components/FilterButton";
import CustomDropdown from "@/components/CustomDropdown";
import CustomMultiSelect from "@/components/CustomMultiSelect";

interface FilterControlsProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedVersions: string[];
  setSelectedVersions: (versions: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  mcVersionOptions: Array<{ value: string; label: string }>;
}

const FilterControls = ({
  selectedType,
  setSelectedType,
  selectedVersions,
  setSelectedVersions,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  mcVersionOptions
}: FilterControlsProps) => {
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'mod', label: 'Addons' },
    { value: 'resource_pack', label: 'Texture Packs' },
  ];

  const sortOptions = [
    { value: 'total_download_count', label: 'Most Downloaded' },
    { value: 'updated_at', label: 'Recently Updated' },
    { value: 'created_at', label: 'Newest' },
    { value: 'name', label: 'Alphabetical' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:hidden">
        {/* Type Filter */}
        <div className="w-full">
          <CustomDropdown
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
            placeholder="All Types"
            className="w-full"
          />
        </div>

        {/* Version Filter */}
        <div className="w-full">
          <CustomMultiSelect
            values={selectedVersions}
            options={mcVersionOptions}
            onChange={setSelectedVersions}
            placeholder="All Versions"
            className="w-full"
          />
        </div>

        {/* Sort Filter */}
        <div className="w-full">
          <CustomDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            placeholder="Sort By"
            className="w-full"
          />
        </div>

        {/* Sort Order */}
        <div className="w-full">
          <FilterButton
            active={false}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="w-full h-9 px-3 flex items-center justify-center gap-2"
          >
            {sortOrder === 'desc' ? (
              <>
                <ArrowDown className="h-4 w-4" />
                <span className="hidden xs:inline">Desc</span>
              </>
            ) : (
              <>
                <ArrowUp className="h-4 w-4" />
                <span className="hidden xs:inline">Asc</span>
              </>
            )}
          </FilterButton>
        </div>
      </div>

      {/* Desktop Flex Layout */}
      <div className="hidden sm:flex justify-center items-center gap-4">
        {/* Type Filter */}
        <div className="flex flex-col items-center min-w-[140px]">
          <CustomDropdown
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
            placeholder="All Types"
            className="w-full"
          />
        </div>

        {/* Version Filter */}
        <div className="flex flex-col items-center min-w-[140px]">
          <CustomMultiSelect
            values={selectedVersions}
            options={mcVersionOptions}
            onChange={setSelectedVersions}
            placeholder="All Versions"
            className="w-full"
          />
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col items-center min-w-[140px]">
          <CustomDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            placeholder="Sort By"
            className="w-full"
          />
        </div>

        {/* Sort Order */}
        <div className="flex flex-col items-center min-w-[140px]">
          <FilterButton
            active={false}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="w-full h-9 px-3 flex items-center justify-center gap-2"
          >
            {sortOrder === 'desc' ? (
              <>
                <ArrowDown className="h-4 w-4" />
                Descending
              </>
            ) : (
              <>
                <ArrowUp className="h-4 w-4" />
                Ascending
              </>
            )}
          </FilterButton>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
