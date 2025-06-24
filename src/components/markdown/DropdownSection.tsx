
import React from 'react';
import { cn } from '@/lib/utils';
import MarkdownParser from './MarkdownParser';

interface DropdownSectionProps {
  title: React.ReactNode;
  content: string[];
  isExpanded: boolean;
  onToggle: () => void;
  expandedSections: Set<string>;
  onToggleSection: (id: string) => void;
}

const DropdownSection = ({ 
  title, 
  content, 
  isExpanded, 
  onToggle,
  expandedSections,
  onToggleSection 
}: DropdownSectionProps) => {
  return (
    <div className="dropdown-section my-4 border border-border/30 rounded-lg overflow-hidden bg-card shadow-sm">
      <button
        onClick={onToggle}
        className={cn(
          "dropdown-trigger w-full px-4 py-3 text-left bg-muted/30 hover:bg-muted/50",
          "transition-colors duration-200 flex items-center justify-between",
          "font-medium text-foreground"
        )}
        aria-expanded={isExpanded}
      >
        <span className="flex-1">{title}</span>
      </button>
      {isExpanded && (
        <div className="dropdown-content p-4 border-t border-border/20 bg-card">
          <MarkdownParser 
            content={content.join('\n')} 
            expandedSections={expandedSections}
            onToggleSection={onToggleSection}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownSection;
