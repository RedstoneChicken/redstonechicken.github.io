
// HTML tag patterns for CommonMark compliance
const HTML_TAG_REGEX = /<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s+[^>]*)?>/;
const HTML_BLOCK_TAGS = [
  'address', 'article', 'aside', 'base', 'basefont', 'blockquote', 'body',
  'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dialog', 'dir',
  'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
  'hr', 'html', 'iframe', 'legend', 'li', 'link', 'main', 'menu', 'menuitem',
  'nav', 'noframes', 'ol', 'optgroup', 'option', 'p', 'param', 'section',
  'source', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead',
  'title', 'tr', 'track', 'ul'
];

export const isSpecialLine = (line: string): boolean => {
  const trimmed = line.trim();
  return (
    !!trimmed.match(/^#{1,6}\s/) ||                    // ATX headings
    !!trimmed.match(/^(\*{3,}|-{3,}|_{3,})\s*$/) ||   // Horizontal rules
    !!trimmed.match(/^(\s*)[-*+]\s/) ||               // Unordered lists
    !!trimmed.match(/^(\s*)\d+\.\s/) ||               // Ordered lists
    trimmed.startsWith('>') ||                        // Blockquotes
    !!trimmed.match(/^(`{3,}|~{3,})/) ||              // Fenced code
    trimmed.startsWith('[dropdown]') ||               // Custom dropdowns
    !!trimmed.match(/^<\/?[a-zA-Z][a-zA-Z0-9-]*/) || // HTML tags
    isHTMLBlock(trimmed)                              // HTML block elements
  );
};

export const isHTMLBlock = (line: string): boolean => {
  const match = line.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
  if (!match) return false;
  return HTML_BLOCK_TAGS.includes(match[1].toLowerCase());
};

export const getHeadingClass = (level: number): string => {
  const baseClasses = "font-bold text-primary";
  switch (level) {
    case 1: return `text-2xl ${baseClasses} mt-8 mb-6 border-b-2 border-primary/30 pb-2`;
    case 2: return `text-xl ${baseClasses} mt-6 mb-4 border-b border-primary/20 pb-2`;
    case 3: return `text-lg ${baseClasses} mt-4 mb-3`;
    case 4: return `text-base ${baseClasses} mt-3 mb-2`;
    case 5: return `text-sm ${baseClasses} mt-2 mb-2`;
    case 6: return `text-xs ${baseClasses} mt-2 mb-1`;
    default: return `${baseClasses}`;
  }
};

export const isBlankLine = (line: string): boolean => {
  return /^\s*$/.test(line);
};

export const getIndentLevel = (line: string): number => {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
};

export const normalizeWhitespace = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};
