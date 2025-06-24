
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const ClearFiltersButton = ({ hasActiveFilters, clearFilters }: ClearFiltersButtonProps) => {
  if (!hasActiveFilters) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={clearFilters}
      className="text-muted-foreground hover:text-foreground font-montserrat"
    >
      <X className="h-4 w-4 mr-2" />
      Clear Filters
    </Button>
  );
};

export default ClearFiltersButton;
