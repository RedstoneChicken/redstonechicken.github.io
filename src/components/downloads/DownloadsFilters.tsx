import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronDown, Check, ArrowUp, ArrowDown } from "lucide-react";
import FilterButton from "@/components/FilterButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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

  const handleVersionToggle = (version: string) => {
    const newVersions = selectedVersions.includes(version) 
      ? selectedVersions.filter(v => v !== version)
      : [...selectedVersions, version];
    setSelectedVersions(newVersions);
  };

  const getVersionDisplayText = () => {
    if (selectedVersions.length === 0) return 'All Versions';
    if (selectedVersions.length === 1) return '1 selected';
    return `${selectedVersions.length} selected`;
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar - Fixed icon positioning */}
        <div className="relative mb-8 w-full">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground z-10" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg bg-background/90 backdrop-blur-sm border-2 border-border/50 
                       hover:border-border hover:bg-background/95 focus:border-primary focus:bg-background
                       rounded-xl shadow-sm transition-all duration-200
                       placeholder:text-muted-foreground/70 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary/80 rounded-lg z-10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filters - Centered and responsive layout */}
        <div className="flex flex-col items-center space-y-4">
          {/* Filter Buttons Grid */}
          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 w-full">
            {/* Type Filter */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-between min-w-[140px] font-montserrat hover:bg-secondary/80 border-2"
                  >
                    <span className="truncate">
                      {typeOptions.find(opt => opt.value === selectedType)?.label || 'All Types'}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  className="min-w-[160px]"
                >
                  {typeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSelectedType(option.value)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>{option.label}</span>
                      {selectedType === option.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Version Filter */}
            <div className="flex justify-center">
              <DropdownMenu open={isVersionDropdownOpen} onOpenChange={setIsVersionDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-between min-w-[140px] font-montserrat hover:bg-secondary/80 border-2"
                  >
                    <span className="truncate">{getVersionDisplayText()}</span>
                    <ChevronDown className={cn(
                      "h-4 w-4 ml-2 transition-transform duration-200",
                      isVersionDropdownOpen && "rotate-180"
                    )} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  className="min-w-[160px] max-h-[300px] overflow-y-auto"
                >
                  {mcVersionOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleVersionToggle(option.value)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>{option.label}</span>
                      {selectedVersions.includes(option.value) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sort Filter - Increased width */}
            <div className="flex justify-center">
              <DropdownMenu open={isSortDropdownOpen} onOpenChange={setIsSortDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-between min-w-[140px] font-montserrat hover:bg-secondary/80 border-2"
                  >
                    <span className="truncate">
                      {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By'}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 ml-2 transition-transform duration-200",
                      isSortDropdownOpen && "rotate-180"
                    )} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  className="min-w-[200px]"
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sort Order - Equal styling for both */}
            <div className="flex justify-center">
              <FilterButton
                active={false}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="min-w-[140px] border-2 flex items-center gap-2"
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

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground font-montserrat"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DownloadsFilters;
