
import React from 'react';
import { isBlankLine } from './utils/parseUtils';
import { parseHeading } from './blocks/HeadingParser';
import { parseCodeBlock } from './blocks/CodeBlockParser';
import { parseList } from './blocks/ListParser';
import { parseBlockquote } from './blocks/BlockquoteParser';
import { parseHtml } from './blocks/HtmlParser';
import { parseDropdown } from './blocks/DropdownParser';
import { parseTable } from './blocks/TableParser';
import { parseAlert } from './blocks/AlertParser';
import { parseMedia } from './blocks/MediaParser';
import { parseCenter } from './blocks/CenterParser';
import { parseParagraph } from './blocks/ParagraphParser';

interface MarkdownParserProps {
  content: string;
  expandedSections: Set<string>;
  onToggleSection: (id: string) => void;
}

const MarkdownParser: React.FC<MarkdownParserProps> = ({
  content,
  expandedSections,
  onToggleSection
}) => {
  if (!content) return [];
  
  try {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let dropdownCount = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Skip blank lines but continue processing
      if (isBlankLine(line)) {
        i++;
        continue;
      }

      const trimmedLine = line.trim();

      // Horizontal Rules
      if (trimmedLine.match(/^(\*{3,}|-{3,}|_{3,})\s*$/)) {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-border/50" />);
        i++;
        continue;
      }

      // Try parsing different block types in order of precedence
      let parsed = false;

      // Alert boxes (highest priority for special syntax)
      const alertResult = parseAlert(lines, i);
      if (alertResult) {
        elements.push(alertResult.element);
        i += alertResult.consumed;
        parsed = true;
      }

      // Media embeds
      if (!parsed) {
        const mediaResult = parseMedia(lines, i);
        if (mediaResult) {
          elements.push(mediaResult.element);
          i += mediaResult.consumed;
          parsed = true;
        }
      }

      // Centered content
      if (!parsed) {
        const centerResult = parseCenter(lines, i);
        if (centerResult) {
          elements.push(centerResult.element);
          i += centerResult.consumed;
          parsed = true;
        }
      }

      // Headings
      if (!parsed) {
        const headingResult = parseHeading(lines, i);
        if (headingResult) {
          elements.push(headingResult.element);
          i += headingResult.consumed;
          parsed = true;
        }
      }

      // Code blocks
      if (!parsed) {
        const codeResult = parseCodeBlock(lines, i);
        if (codeResult) {
          elements.push(codeResult.element);
          i += codeResult.consumed;
          parsed = true;
        }
      }

      // Tables
      if (!parsed) {
        const tableResult = parseTable(lines, i);
        if (tableResult) {
          elements.push(tableResult.element);
          i += tableResult.consumed;
          parsed = true;
        }
      }

      // Blockquotes
      if (!parsed) {
        const blockquoteResult = parseBlockquote(lines, i);
        if (blockquoteResult) {
          elements.push(blockquoteResult.element);
          i += blockquoteResult.consumed;
          parsed = true;
        }
      }

      // HTML blocks
      if (!parsed) {
        const htmlResult = parseHtml(lines, i);
        if (htmlResult) {
          elements.push(htmlResult.element);
          i += htmlResult.consumed;
          parsed = true;
        }
      }

      // Lists
      if (!parsed) {
        const listResult = parseList(lines, i);
        if (listResult) {
          elements.push(listResult.element);
          i += listResult.consumed;
          parsed = true;
        }
      }

      // Custom dropdown sections
      if (!parsed) {
        const dropdownResult = parseDropdown(lines, i, dropdownCount, expandedSections, onToggleSection);
        if (dropdownResult) {
          elements.push(dropdownResult.element);
          i += dropdownResult.consumed;
          dropdownCount++;
          parsed = true;
        }
      }

      // Regular paragraphs
      if (!parsed) {
        const paragraphResult = parseParagraph(lines, i);
        if (paragraphResult) {
          elements.push(paragraphResult.element);
          i += paragraphResult.consumed;
          parsed = true;
        }
      }

      // If nothing was parsed, force increment to prevent infinite loop
      if (!parsed) {
        i++;
      }
    }

    return elements;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return [
      <div key="error" className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
        <p className="text-red-400 font-medium">Error parsing markdown content</p>
        <pre className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{content}</pre>
      </div>
    ];
  }
};

export default MarkdownParser;
