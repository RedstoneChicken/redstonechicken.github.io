
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CustomMultiSelectProps {
  values: string[];
  options: Option[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

const CustomMultiSelect = ({
  values,
  options,
  onChange,
  placeholder = "Select options",
  className
}: CustomMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter(v => v !== optionValue)
      : [...values, optionValue];
    onChange(newValues);
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectedLabels = values.map(value => 
    options.find(option => option.value === value)?.label
  ).filter(Boolean);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="justify-between w-full font-montserrat bg-background/20 backdrop-blur-md border-border/40 hover:border-primary/40 hover:bg-background/30 transition-all duration-300"
      >
        <span className="truncate">
          {selectedLabels.length > 0 
            ? `${selectedLabels.length} selected`
            : placeholder
          }
        </span>
        <div className="flex items-center gap-1 ml-2">
          {values.length > 0 && (
            <X 
              className="h-3 w-3 hover:bg-muted/50 rounded cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
            />
          )}
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180"
            )} 
          />
        </div>
      </Button>

      {isOpen && (
        <div className={cn(
          "absolute top-full left-0 right-0 z-50 mt-1",
          "bg-background/20 backdrop-blur-xl border border-border/40 rounded-xl shadow-2xl shadow-primary/10",
          "animate-slideDown origin-top"
        )}>
          {/* AI-style glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 rounded-xl pointer-events-none"></div>
          
          <div className="max-h-60 overflow-y-auto p-1 relative z-10">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm font-montserrat transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary rounded-md backdrop-blur-sm",
                  "flex items-center justify-between group relative overflow-hidden",
                  values.includes(option.value) && "bg-primary/20 text-primary border border-primary/30"
                )}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                
                <span className="relative z-10">{option.label}</span>
                {values.includes(option.value) && (
                  <Check className="h-4 w-4 text-primary relative z-10" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
