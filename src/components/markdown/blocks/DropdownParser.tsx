
import React from 'react';
import DropdownSection from '../DropdownSection';
import { parseInlineElements } from '../utils/inlineParser';

export interface DropdownParseResult {
  element: React.ReactNode;
  consumed: number;
  dropdownId: string;
}

export const parseDropdown = (
  lines: string[], 
  startIndex: number, 
  dropdownCount: number,
  expandedSections: Set<string>,
  onToggleSection: (id: string) => void
): DropdownParseResult | null => {
  const line = lines[startIndex];
  const trimmedLine = line.trim();
  
  if (!trimmedLine.startsWith('[dropdown]')) {
    return null;
  }

  const title = trimmedLine.replace('[dropdown]', '').trim();
  const dropdownId = `dropdown-${dropdownCount}`;
  const isExpanded = expandedSections.has(dropdownId);
  
  const dropdownContent = [];
  let i = startIndex + 1;
  
  while (i < lines.length && !lines[i].trim().startsWith('[/dropdown]')) {
    dropdownContent.push(lines[i]);
    i++;
  }
  i++; // Skip [/dropdown]
  
  // Parse the title for inline formatting
  const parsedTitle = parseInlineElements(title);
  
  const element = (
    <DropdownSection
      key={dropdownId}
      title={parsedTitle}
      content={dropdownContent}
      isExpanded={isExpanded}
      onToggle={() => onToggleSection(dropdownId)}
      expandedSections={expandedSections}
      onToggleSection={onToggleSection}
    />
  );
  
  return { element, consumed: i - startIndex, dropdownId };
};
