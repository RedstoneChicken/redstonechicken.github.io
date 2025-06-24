
// CommonMark inline element patterns
export const INLINE_PATTERNS = {
  // Strong emphasis (**text** or __text__)
  strong: [
    /\*\*([^*\n]+?)\*\*/g,
    /__([^_\n]+?)__/g
  ],
  // Emphasis (*text* or _text_)
  emphasis: [
    /(?<!\*)\*([^*\n]+?)\*(?!\*)/g,
    /(?<!_)_([^_\n]+?)_(?!_)/g
  ],
  // Strikethrough (~~text~~)
  strikethrough: /~~([^~\n]+?)~~/g,
  // Highlighted text (==text==)
  highlight: /==([^=\n]+?)==/g,
  // Inline code (`code`)
  code: /`([^`\n]+?)`/g,
  // Linked images [![alt](src)](url)
  linkedImage: /\[!\[([^\]]*?)\]\(([^)\s]+?)(?:\s+"([^"]*?)")?\)\]\(([^)\s]+?)(?:\s+"([^"]*?)")?\)/g,
  // Links [text](url "optional title")
  link: /\[([^\]]*?)\]\(([^)\s]+?)(?:\s+"([^"]*?)")?\)/g,
  // Images ![alt](src "optional title")
  image: /!\[([^\]]*?)\]\(([^)\s]+?)(?:\s+"([^"]*?)")?\)/g,
  // Auto-links (URLs and emails)
  autoLink: /(https?:\/\/[^\s<>\[\]]+|mailto:[^\s<>\[\]]+)/g,
  // HTML tags
  html: /<[^>]+>/g,
  // Line breaks (two or more spaces at end of line)
  lineBreak: /  \n/g
};

// Escape character mapping
export const ESCAPE_CHARS = {
  '\\*': '*',
  '\\**': '**',
  '\\_': '_',
  '\\__': '__',
  '\\`': '`',
  '\\[': '[',
  '\\]': ']',
  '\\(': '(',
  '\\)': ')',
  '\\!': '!',
  '\\~': '~',
  '\\=': '=',
  '\\\\': '\\'
};
