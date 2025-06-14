
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FilterDropdown = ({ 
  value, 
  options, 
  onChange, 
  placeholder = "Select option",
  className 
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "justify-between min-w-[120px] font-montserrat border-2 border-border/20 hover:border-primary/80",
            className
          )}
        >
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 ml-2 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start"
        side="bottom"
        sideOffset={4}
        className="min-w-[160px] bg-popover/95 backdrop-blur-sm border-2 border-border/60 shadow-lg z-50"
        avoidCollisions={true}
        collisionPadding={8}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 font-montserrat border-2 border-transparent hover:border-primary/60"
          >
            <span>{option.label}</span>
            {value === option.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
