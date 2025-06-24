
import { useState, useRef, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  trigger?: ReactNode;
}

const CustomDropdown = ({
  value,
  options,
  onChange,
  placeholder = "Select option",
  className,
  trigger
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);

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

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </div>
      ) : (
        <Button
          ref={buttonRef}
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="justify-between w-full font-montserrat bg-background/20 backdrop-blur-md border-border/40 hover:border-primary/40 hover:bg-background/30 transition-all duration-300"
        >
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 ml-2 transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180"
            )} 
          />
        </Button>
      )}

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
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm font-montserrat transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary rounded-md backdrop-blur-sm",
                  "flex items-center justify-between group relative overflow-hidden",
                  value === option.value && "bg-primary/20 text-primary border border-primary/30"
                )}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                
                <span className="relative z-10">{option.label}</span>
                {value === option.value && (
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

export default CustomDropdown;
