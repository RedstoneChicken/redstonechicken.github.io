
import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon, ExternalLink, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FullMarkdownRendererProps {
  content: string;
  images?: string[];
  className?: string;
}

const FullMarkdownRenderer = ({ content, images = [], className }: FullMarkdownRendererProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = async (text: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const result = [];
    let currentList = [];
    let listType = null;
    let codeBlockCount = 0;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = '';
    let inTable = false;
    let tableRows = [];
    let footnotes = new Map();
    let referenceLinks = new Map();

    // First pass: collect footnotes and reference links
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Footnote definitions
      const footnoteMatch = line.match(/^\[?\^([^\]]+)\]:\s*(.+)$/);
      if (footnoteMatch) {
        footnotes.set(footnoteMatch[1], footnoteMatch[2]);
        continue;
      }
      
      // Reference link definitions
      const refLinkMatch = line.match(/^\[([^\]]+)\]:\s*(\S+)(?:\s+"([^"]*)")?$/);
      if (refLinkMatch) {
        referenceLinks.set(refLinkMatch[1].toLowerCase(), {
          url: refLinkMatch[2],
          title: refLinkMatch[3] || ''
        });
        continue;
      }
    }

    // Second pass: parse content
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Skip footnote and reference definitions
      if (trimmedLine.match(/^\[?\^[^\]]+\]:\s*/) || trimmedLine.match(/^\[[^\]]+\]:\s*\S+/)) {
        continue;
      }
      
      // Handle code blocks
      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = trimmedLine.substring(3).trim();
          codeBlockContent = [];
          continue;
        } else {
          inCodeBlock = false;
          const codeId = `code-${codeBlockCount++}`;
          const codeText = codeBlockContent.join('\n');
          
          result.push(
            <div key={codeId} className="relative group my-6 glass-panel border border-border/40 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between bg-muted/20 px-4 py-2 border-b border-border/30">
                <span className="text-sm font-mono text-muted-foreground">
                  {codeBlockLanguage || 'code'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(codeText, codeId)}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedCode === codeId ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-foreground font-mono">{codeText}</code>
              </pre>
            </div>
          );
          continue;
        }
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle tables
      if (trimmedLine.includes('|') && trimmedLine.split('|').length > 2) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        // Skip header separator row
        if (!trimmedLine.match(/^\|?\s*[-:]+\s*\|/)) {
          tableRows.push(trimmedLine);
        }
        continue;
      } else if (inTable) {
        // End of table
        inTable = false;
        if (tableRows.length > 0) {
          result.push(
            <div key={`table-${i}`} className="overflow-x-auto my-6">
              <table className="min-w-full border border-border/30 rounded-lg overflow-hidden">
                <tbody>
                  {tableRows.map((row, idx) => {
                    const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                    return (
                      <tr key={idx} className={idx === 0 ? "bg-muted/20 font-medium" : "hover:bg-muted/10"}>
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-2 border-b border-border/20">
                            {formatInlineText(cell, footnotes, referenceLinks)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        tableRows = [];
        // Process current line as non-table content
      }

      if (!trimmedLine && !inTable) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType, footnotes, referenceLinks));
          currentList = [];
          listType = null;
        }
        continue;
      }

      // Headers with underline style support
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine.match(/^=+$/)) {
          result.push(
            <h1 key={i} className="text-2xl font-bold mt-12 mb-8 text-primary border-b border-border/30 pb-4">
              {formatInlineText(trimmedLine, footnotes, referenceLinks)}
            </h1>
          );
          i++; // Skip the underline
          continue;
        } else if (nextLine.match(/^-+$/)) {
          result.push(
            <h2 key={i} className="text-xl font-bold mt-10 mb-6 text-primary border-b border-border/30 pb-3">
              {formatInlineText(trimmedLine, footnotes, referenceLinks)}
            </h2>
          );
          i++; // Skip the underline
          continue;
        }
      }

      // Headers with # style
      const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const text = headerMatch[2];
        const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
        const classes = {
          1: "text-2xl font-bold mt-12 mb-8 text-primary border-b border-border/30 pb-4",
          2: "text-xl font-bold mt-10 mb-6 text-primary border-b border-border/30 pb-3",
          3: "text-lg font-semibold mt-8 mb-4 text-primary border-b border-border/30 pb-2",
          4: "text-lg font-semibold mt-7 mb-4 text-primary border-b border-border/20 pb-2",
          5: "text-base font-semibold mt-6 mb-3 text-primary border-b border-border/20 pb-1",
          6: "text-sm font-semibold mt-6 mb-3 text-primary border-b border-border/20 pb-1"
        };
        
        result.push(
          <HeaderTag key={i} className={classes[level as keyof typeof classes]}>
            {formatInlineText(text, footnotes, referenceLinks)}
          </HeaderTag>
        );
        continue;
      }

      // Horizontal rules
      if (trimmedLine.match(/^[-*_]{3,}$/)) {
        result.push(<hr key={i} className="my-8 border-border/30" />);
        continue;
      }

      // Blockquotes
      if (trimmedLine.startsWith('>')) {
        const quoteText = trimmedLine.replace(/^>\s?/, '');
        result.push(
          <blockquote key={i} className="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-muted/10 rounded-r-lg italic text-muted-foreground">
            {formatInlineText(quoteText, footnotes, referenceLinks)}
          </blockquote>
        );
        continue;
      }

      // Lists
      const unorderedMatch = trimmedLine.match(/^[-*+]\s+(.+)$/);
      const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
      
      if (unorderedMatch) {
        if (listType !== 'ul') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType, footnotes, referenceLinks));
          }
          currentList = [];
          listType = 'ul';
        }
        currentList.push(unorderedMatch[1]);
        continue;
      } else if (orderedMatch) {
        if (listType !== 'ol') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType, footnotes, referenceLinks));
          }
          currentList = [];
          listType = 'ol';
        }
        currentList.push(orderedMatch[1]);
        continue;
      } else if (currentList.length > 0) {
        result.push(renderList(currentList, listType, footnotes, referenceLinks));
        currentList = [];
        listType = null;
      }

      // Image placeholders and external images
      if (trimmedLine.startsWith('[image]')) {
        const imageIndex = parseInt(trimmedLine.replace('[image]', '').trim()) || 0;
        const imageUrl = images[imageIndex];
        if (imageUrl) {
          result.push(
            <div key={i} className="my-8">
              <img 
                src={imageUrl} 
                alt={`Description image ${imageIndex + 1}`}
                className="w-full rounded-xl shadow-lg border border-border/30 hover:shadow-xl transition-shadow cursor-pointer"
              />
            </div>
          );
        } else {
          result.push(
            <div key={i} className="my-8 p-8 border-2 border-dashed border-muted rounded-xl text-center text-muted-foreground glass-panel">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Image placeholder {imageIndex + 1}</p>
            </div>
          );
        }
        continue;
      }

      // Regular paragraphs
      if (trimmedLine) {
        result.push(
          <p key={i} className="mb-6 text-muted-foreground leading-relaxed text-base">
            {formatInlineText(trimmedLine, footnotes, referenceLinks)}
          </p>
        );
      }
    }

    // Handle remaining list
    if (currentList.length > 0) {
      result.push(renderList(currentList, listType, footnotes, referenceLinks));
    }

    return result;
  };

  const renderList = (items: string[], type: string | null, footnotes: Map<string, string>, referenceLinks: Map<string, any>) => {
    const ListComponent = type === 'ol' ? 'ol' : 'ul';
    const className = type === 'ol' 
      ? "list-decimal list-inside mb-6 space-y-2 text-muted-foreground pl-4"
      : "list-disc list-inside mb-6 space-y-2 text-muted-foreground pl-4";
    
    return (
      <ListComponent key={`list-${Math.random()}`} className={className}>
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {formatInlineText(item, footnotes, referenceLinks)}
          </li>
        ))}
      </ListComponent>
    );
  };

  const formatInlineText = (text: string, footnotes: Map<string, string>, referenceLinks: Map<string, any>) => {
    // Handle inline images first (both external URLs and reference style)
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g, 
      '<img src="$2" alt="$1" title="$3" class="inline-block max-w-full h-auto rounded border border-border/30" />');
    
    text = text.replace(/!\[([^\]]*)\]\[([^\]]+)\]/g, (match, alt, ref) => {
      const link = referenceLinks.get(ref.toLowerCase());
      if (link) {
        return `<img src="${link.url}" alt="${alt}" title="${link.title}" class="inline-block max-w-full h-auto rounded border border-border/30" />`;
      }
      return match;
    });

    // Handle links (reference style first, then inline)
    text = text.replace(/\[([^\]]+)\]\[([^\]]*)\]/g, (match, linkText, ref) => {
      const refKey = ref || linkText.toLowerCase();
      const link = referenceLinks.get(refKey);
      if (link) {
        return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" title="${link.title}" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors">${linkText}</a>`;
      }
      return match;
    });

    text = text.replace(/\[([^\]]+)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g, 
      '<a href="$2" target="_blank" rel="noopener noreferrer" title="$3" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors">$1</a>');

    // Auto-link URLs
    text = text.replace(/(^|[^"])(https?:\/\/[^\s<>]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline">$2</a>');
    text = text.replace(/<(https?:\/\/[^>]+)>/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline">$1</a>');

    // Handle emphasis and strong
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em class="italic text-primary/80">$1</em></strong>');
    text = text.replace(/___([^_]+)___/g, '<strong><em class="italic text-primary/80">$1</em></strong>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong class="text-foreground font-semibold">$1</strong>');
    text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-primary/80">$1</em>');
    text = text.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em class="italic text-primary/80">$1</em>');

    // Handle strikethrough
    text = text.replace(/~~([^~]+)~~/g, '<del class="line-through text-muted-foreground/60">$1</del>');

    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-muted/50 border border-border/30 px-2 py-1 rounded text-sm font-mono text-primary">$1</code>');

    // Handle footnotes
    text = text.replace(/\[\^([^\]]+)\]/g, (match, ref) => {
      const footnote = footnotes.get(ref);
      if (footnote) {
        return `<sup class="text-primary cursor-help" title="${footnote}">[${ref}]</sup>`;
      }
      return match;
    });

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      {parseContent(content)}
    </div>
  );
};

export default FullMarkdownRenderer;
