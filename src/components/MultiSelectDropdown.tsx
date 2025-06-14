
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MultiSelectDropdownProps {
  values: string[];
  options: Array<{ value: string; label: string }>;
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelectDropdown = ({ 
  values, 
  options, 
  onChange, 
  placeholder = "Select options",
  className 
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleValue = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  const clearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (values.length === 0) return placeholder;
    if (values.length === 1) return options.find(opt => opt.value === values[0])?.label || values[0];
    return `${values.length} selected`;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "justify-between min-w-[140px]",
            className
          )}
        >
          <span className="truncate">
            {getDisplayText()}
          </span>
          <div className="flex items-center gap-1 ml-2">
            {values.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="hover:bg-destructive/20 rounded-sm p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start"
        className="min-w-[160px] bg-popover border border-border/60 shadow-lg z-50"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={() => setIsOpen(false)}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={(e) => {
              e.preventDefault();
              toggleValue(option.value);
            }}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>{option.label}</span>
            {values.includes(option.value) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelectDropdown;
