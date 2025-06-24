
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';
import { isBlankLine } from '../utils/parseUtils';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

export interface TableParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseTable = (lines: string[], startIndex: number): TableParseResult | null => {
  const line = lines[startIndex];
  
  // Check if this looks like a table (contains |)
  if (!line.includes('|')) {
    return null;
  }

  // Look for separator line (next line with dashes and colons)
  if (startIndex + 1 >= lines.length) {
    return null;
  }
  
  const separatorLine = lines[startIndex + 1];
  if (!separatorLine.match(/^\s*\|?[\s\-:]+\|[\s\-:|]*\|?\s*$/)) {
    return null;
  }

  // Parse header row
  const headerCells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
  
  // Parse alignment from separator
  const alignments = separatorLine.split('|').map(cell => {
    const trimmed = cell.trim();
    if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
    if (trimmed.endsWith(':')) return 'right';
    return 'left';
  }).filter((_, index) => index < headerCells.length);

  // Parse body rows
  const bodyRows = [];
  let i = startIndex + 2;
  
  while (i < lines.length && !isBlankLine(lines[i]) && lines[i].includes('|')) {
    const cells = lines[i].split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length > 0) {
      bodyRows.push(cells);
    }
    i++;
  }

  const element = (
    <div key={`table-${startIndex}`} className="my-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headerCells.map((cell, index) => (
              <TableHead 
                key={index} 
                className={alignments[index] === 'center' ? 'text-center' : alignments[index] === 'right' ? 'text-right' : 'text-left'}
              >
                {parseInlineElements(cell)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodyRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell 
                  key={cellIndex}
                  className={alignments[cellIndex] === 'center' ? 'text-center' : alignments[cellIndex] === 'right' ? 'text-right' : 'text-left'}
                >
                  {parseInlineElements(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return { element, consumed: i - startIndex };
};
