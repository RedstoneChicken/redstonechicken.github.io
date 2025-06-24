
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';

export interface CenterParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseCenter = (lines: string[], startIndex: number): CenterParseResult | null => {
  const line = lines[startIndex];
  const centerMatch = line.match(/^\[CENTER\](.*?)\[\/CENTER\]$/);
  
  if (!centerMatch) {
    return null;
  }

  const content = centerMatch[1];
  console.log('Center content before parsing:', content);
  
  const parsedContent = parseInlineElements(content);
  console.log('Center content after parsing:', parsedContent);

  const element = (
    <div key={`center-${startIndex}`} className="text-center my-4">
      <span className="inline-block">{parsedContent}</span>
    </div>
  );

  return { element, consumed: 1 };
};
