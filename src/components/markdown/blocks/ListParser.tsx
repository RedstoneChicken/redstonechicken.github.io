
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';
import { getIndentLevel, isBlankLine } from '../utils/parseUtils';
import { ListItem } from '../types';

export interface ListParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseList = (lines: string[], startIndex: number): ListParseResult | null => {
  const line = lines[startIndex];
  const unorderedMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
  const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
  
  if (!unorderedMatch && !orderedMatch) {
    return null;
  }

  const listItems: ListItem[] = [];
  const isOrdered = !!orderedMatch;
  const baseIndent = getIndentLevel(line);
  let i = startIndex;
  
  while (i < lines.length) {
    const currentLine = lines[i];
    const unorderedCurrent = currentLine.match(/^(\s*)[-*+]\s+(.+)$/);
    const orderedCurrent = currentLine.match(/^(\s*)(\d+)\.\s+(.+)$/);
    
    if ((isOrdered && orderedCurrent) || (!isOrdered && unorderedCurrent)) {
      const match = unorderedCurrent || orderedCurrent;
      const text = match![isOrdered ? 3 : 2];
      const indent = getIndentLevel(currentLine);
      
      listItems.push({
        content: parseInlineElements(text),
        indent: indent - baseIndent
      });
      i++;
    } else if (isBlankLine(currentLine)) {
      i++;
    } else if (currentLine.match(/^\s+/) && listItems.length > 0) {
      // Continuation of list item
      i++;
    } else {
      break;
    }
  }
  
  const ListTag = isOrdered ? 'ol' : 'ul';
  const listClass = isOrdered 
    ? "list-decimal list-inside mb-4 space-y-1 text-muted-foreground pl-4"
    : "list-disc list-inside mb-4 space-y-1 text-muted-foreground pl-4";
  
  const element = React.createElement(ListTag, {
    key: `list-${startIndex}`,
    className: listClass
  }, listItems.map((item, idx) => 
    <li key={`${startIndex}-${idx}`} style={{ marginLeft: `${item.indent * 20}px` }}>
      {item.content}
    </li>
  ));
  
  return { element, consumed: i - startIndex };
};
