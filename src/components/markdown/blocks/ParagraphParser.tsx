
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';
import { isBlankLine, isSpecialLine } from '../utils/parseUtils';

export interface ParagraphParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseParagraph = (lines: string[], startIndex: number): ParagraphParseResult | null => {
  const paragraphLines = [];
  let i = startIndex;
  
  while (i < lines.length && !isBlankLine(lines[i]) && !isSpecialLine(lines[i])) {
    paragraphLines.push(lines[i]);
    i++;
  }
  
  if (paragraphLines.length === 0) {
    return null;
  }
  
  const element = (
    <p key={`p-${startIndex}`} className="mb-4 text-muted-foreground leading-relaxed">
      {parseInlineElements(paragraphLines.join(' '))}
    </p>
  );
  
  return { element, consumed: i - startIndex };
};
