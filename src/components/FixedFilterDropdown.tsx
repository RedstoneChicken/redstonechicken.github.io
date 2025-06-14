
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface FixedFilterDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FixedFilterDropdown = ({
  value,
  options,
  onChange,
  placeholder = "Select...",
  className
}: FixedFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full justify-between font-montserrat red-border-hover transition-all duration-300",
          "border border-border/40 bg-background/80 backdrop-blur-sm",
          isOpen && "border-primary/50"
        )}
      >
        <span className="truncate">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className={cn(
            "absolute top-full left-0 right-0 z-20 mt-1",
            "glass-panel border border-border/50 rounded-xl shadow-xl",
            "animate-slideDown"
          )}>
            <div className="max-h-60 overflow-y-auto scrollbar-thin">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm font-montserrat transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary first:rounded-t-xl last:rounded-b-xl",
                    "interactive-element",
                    value === option.value && "bg-primary/20 text-primary font-medium"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FixedFilterDropdown;
