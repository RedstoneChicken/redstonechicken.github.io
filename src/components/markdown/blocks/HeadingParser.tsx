
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';
import { getHeadingClass } from '../utils/parseUtils';

export interface HeadingParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseHeading = (lines: string[], startIndex: number): HeadingParseResult | null => {
  const line = lines[startIndex];
  const trimmedLine = line.trim();

  // ATX Headings (# ## ### etc.)
  const atxHeadingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
  if (atxHeadingMatch) {
    const level = atxHeadingMatch[1].length;
    const text = atxHeadingMatch[2];
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    
    const element = React.createElement(HeadingTag, {
      key: `heading-${startIndex}`,
      className: getHeadingClass(level)
    }, parseInlineElements(text));
    
    return { element, consumed: 1 };
  }

  // Setext headings (underlined with = or -)
  if (startIndex + 1 < lines.length) {
    const nextLine = lines[startIndex + 1].trim();
    if (nextLine.match(/^=+\s*$/) && trimmedLine) {
      const element = (
        <h1 key={`setext-h1-${startIndex}`} className={getHeadingClass(1)}>
          {parseInlineElements(trimmedLine)}
        </h1>
      );
      return { element, consumed: 2 };
    } else if (nextLine.match(/^-+\s*$/) && trimmedLine) {
      const element = (
        <h2 key={`setext-h2-${startIndex}`} className={getHeadingClass(2)}>
          {parseInlineElements(trimmedLine)}
        </h2>
      );
      return { element, consumed: 2 };
    }
  }

  return null;
};
