
import React from 'react';
import { isHTMLBlock, isBlankLine } from '../utils/parseUtils';

export interface HtmlParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseHtml = (lines: string[], startIndex: number): HtmlParseResult | null => {
  const line = lines[startIndex];
  const trimmedLine = line.trim();
  
  if (!isHTMLBlock(trimmedLine) && !trimmedLine.match(/^<[^>]+>.*<\/[^>]+>$/)) {
    return null;
  }

  const htmlLines = [line];
  let i = startIndex + 1;
  
  // Continue until we find a closing tag or blank line
  while (i < lines.length && !isBlankLine(lines[i])) {
    htmlLines.push(lines[i]);
    i++;
  }
  
  const element = (
    <div 
      key={`html-${startIndex}`} 
      className="my-4"
      dangerouslySetInnerHTML={{ __html: htmlLines.join('\n') }} 
    />
  );
  
  return { element, consumed: i - startIndex };
};
