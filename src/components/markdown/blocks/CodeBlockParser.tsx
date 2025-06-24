
import React from 'react';
import { isBlankLine } from '../utils/parseUtils';

export interface CodeBlockParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseCodeBlock = (lines: string[], startIndex: number): CodeBlockParseResult | null => {
  const line = lines[startIndex];
  const trimmedLine = line.trim();

  // Fenced code blocks (``` or ~~~)
  const fencedCodeMatch = trimmedLine.match(/^(`{3,}|~{3,})(.*)$/);
  if (fencedCodeMatch) {
    const fence = fencedCodeMatch[1];
    const lang = fencedCodeMatch[2].trim();
    const codeLines = [];
    let i = startIndex + 1;
    
    while (i < lines.length && !lines[i].trim().startsWith(fence.charAt(0).repeat(fence.length))) {
      codeLines.push(lines[i]);
      i++;
    }
    
    const element = (
      <pre key={`code-${startIndex}`} className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4 border border-border/30">
        <code className={lang ? `language-${lang}` : ''}>
          {codeLines.join('\n')}
        </code>
      </pre>
    );
    
    return { element, consumed: i - startIndex + 1 };
  }

  // Indented code blocks (4+ spaces or tab)
  if (line.match(/^    .+/) || line.match(/^\t.+/)) {
    const codeLines = [];
    let i = startIndex;
    
    while (i < lines.length && (lines[i].match(/^    .+/) || lines[i].match(/^\t.+/) || isBlankLine(lines[i]))) {
      codeLines.push(lines[i].replace(/^    |^\t/, ''));
      i++;
    }
    
    const element = (
      <pre key={`indent-code-${startIndex}`} className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4 border border-border/30">
        <code>{codeLines.join('\n')}</code>
      </pre>
    );
    
    return { element, consumed: i - startIndex };
  }

  return null;
};
