
import React from 'react';
import { parseSimpleInlineElements } from '../utils/inlineParser';
import { isBlankLine } from '../utils/parseUtils';

export interface BlockquoteParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseBlockquote = (lines: string[], startIndex: number): BlockquoteParseResult | null => {
  const line = lines[startIndex];
  const trimmedLine = line.trim();
  
  if (!trimmedLine.startsWith('>')) {
    return null;
  }

  const blockquoteLines = [];
  let i = startIndex;
  
  while (i < lines.length && (lines[i].trim().startsWith('>') || isBlankLine(lines[i]))) {
    if (lines[i].trim()) {
      blockquoteLines.push(lines[i].replace(/^\s*>\s?/, ''));
    } else {
      blockquoteLines.push('');
    }
    i++;
  }
  
  const element = (
    <blockquote key={`quote-${startIndex}`} className="border-l-4 border-primary/30 pl-4 my-4 text-muted-foreground italic bg-muted/20 p-4 rounded-r-lg">
      <div dangerouslySetInnerHTML={{ __html: parseSimpleInlineElements(blockquoteLines.join('\n')) }} />
    </blockquote>
  );
  
  return { element, consumed: i - startIndex };
};
