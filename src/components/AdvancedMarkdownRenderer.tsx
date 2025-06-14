
import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon, ExternalLink, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdvancedMarkdownRendererProps {
  content: string;
  images?: string[];
  className?: string;
}

const AdvancedMarkdownRenderer = ({ content, images = [], className }: AdvancedMarkdownRendererProps) => {
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
    let dropdownCount = 0;
    let codeBlockCount = 0;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Starting code block
          inCodeBlock = true;
          codeBlockLanguage = line.trim().substring(3).trim();
          codeBlockContent = [];
          continue;
        } else {
          // Ending code block
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
          codeBlockContent = [];
          codeBlockLanguage = '';
          continue;
        }
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        continue;
      }

      // Headers with improved styling and anchor links
      if (trimmedLine.startsWith('######')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('######', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h6 key={i} id={headerId} className="text-sm font-semibold mt-6 mb-3 text-primary border-b border-border/20 pb-1 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h6>
        );
      } else if (trimmedLine.startsWith('#####')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('#####', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h5 key={i} id={headerId} className="text-base font-semibold mt-6 mb-3 text-primary border-b border-border/20 pb-1 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h5>
        );
      } else if (trimmedLine.startsWith('####')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('####', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h4 key={i} id={headerId} className="text-lg font-semibold mt-7 mb-4 text-primary border-b border-border/30 pb-2 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h4>
        );
      } else if (trimmedLine.startsWith('###')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('###', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h3 key={i} id={headerId} className="text-lg font-semibold mt-8 mb-4 text-primary border-b border-border/30 pb-2 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h3>
        );
      } else if (trimmedLine.startsWith('##')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('##', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h2 key={i} id={headerId} className="text-xl font-bold mt-10 mb-6 text-primary border-b border-border/30 pb-3 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h2>
        );
      } else if (trimmedLine.startsWith('#')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const headerText = trimmedLine.replace('#', '').trim();
        const headerId = headerText.toLowerCase().replace(/[^a-z0-9]/g, '-');
        result.push(
          <h1 key={i} id={headerId} className="text-2xl font-bold mt-12 mb-8 text-primary border-b border-border/30 pb-4 group">
            <a href={`#${headerId}`} className="hover:text-primary/80 transition-colors">
              {headerText}
            </a>
          </h1>
        );
      }
      // Collapsible sections
      else if (trimmedLine.startsWith('[dropdown]')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const title = trimmedLine.replace('[dropdown]', '').trim();
        const dropdownId = `dropdown-${dropdownCount++}`;
        const isExpanded = expandedSections.has(dropdownId);
        
        // Find content until [/dropdown]
        let dropdownContent = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('[/dropdown]')) {
          dropdownContent.push(lines[j]);
          j++;
        }
        i = j; // Skip to after [/dropdown]
        
        result.push(
          <div key={dropdownId} className="glass-panel border border-border/40 rounded-xl mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection(dropdownId)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
            >
              <span className="font-medium text-foreground">{title}</span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {isExpanded && (
              <div className="p-4 pt-0 border-t border-border/30 animate-fade-in">
                <div className="prose prose-invert max-w-none">
                  {parseContent(dropdownContent.join('\n'))}
                </div>
              </div>
            )}
          </div>
        );
      }
      // Blockquotes
      else if (trimmedLine.startsWith('>')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const quoteText = trimmedLine.replace('>', '').trim();
        result.push(
          <blockquote key={i} className="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-muted/10 rounded-r-lg italic text-muted-foreground">
            {formatInlineText(quoteText)}
          </blockquote>
        );
      }
      // Tables (basic support)
      else if (trimmedLine.includes('|') && trimmedLine.split('|').length > 2) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        
        // Collect table rows
        const tableRows = [trimmedLine];
        let j = i + 1;
        while (j < lines.length && lines[j].trim().includes('|')) {
          tableRows.push(lines[j].trim());
          j++;
        }
        i = j - 1; // Adjust index
        
        // Skip header separator row if present
        const filteredRows = tableRows.filter(row => !row.match(/^\|?\s*[-:]+\s*\|/));
        
        if (filteredRows.length > 0) {
          result.push(
            <div key={i} className="overflow-x-auto my-6">
              <table className="min-w-full border border-border/30 rounded-lg overflow-hidden">
                <tbody>
                  {filteredRows.map((row, idx) => {
                    const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                    return (
                      <tr key={idx} className={idx === 0 ? "bg-muted/20 font-medium" : "hover:bg-muted/10"}>
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-2 border-b border-border/20">
                            {formatInlineText(cell)}
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
      }
      // Horizontal rule
      else if (trimmedLine.match(/^[-*_]{3,}$/)) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<hr key={i} className="my-8 border-border/30" />);
      }
      // Lists with improved styling
      else if (trimmedLine.match(/^[-*+]\s/)) {
        if (listType !== 'ul') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType));
          }
          currentList = [];
          listType = 'ul';
        }
        currentList.push(trimmedLine.replace(/^[-*+]\s/, ''));
      } else if (trimmedLine.match(/^\d+\.\s/)) {
        if (listType !== 'ol') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType));
          }
          currentList = [];
          listType = 'ol';
        }
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
      }
      // Image placeholders with better styling
      else if (trimmedLine.startsWith('[image]')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
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
      }
      // Regular paragraphs with better typography
      else {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<p key={i} className="mb-6 text-muted-foreground leading-relaxed text-base">{formatInlineText(trimmedLine)}</p>);
      }
    }

    // Handle any remaining list
    if (currentList.length > 0) {
      result.push(renderList(currentList, listType));
    }

    return result;
  };

  const renderList = (items: string[], type: string | null) => {
    const ListComponent = type === 'ol' ? 'ol' : 'ul';
    const className = type === 'ol' 
      ? "list-decimal list-inside mb-6 space-y-2 text-muted-foreground pl-4"
      : "list-disc list-inside mb-6 space-y-2 text-muted-foreground pl-4";
    
    return (
      <ListComponent key={`list-${Math.random()}`} className={className}>
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">{formatInlineText(item)}</li>
        ))}
      </ListComponent>
    );
  };

  const formatInlineText = (text: string) => {
    // Handle HTML tags (allow them through)
    if (text.includes('<') && text.includes('>')) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
    
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    // Handle italic text
    text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-primary/80">$1</em>');
    // Handle strikethrough
    text = text.replace(/~~(.*?)~~/g, '<del class="line-through text-muted-foreground/60">$1</del>');
    // Handle inline code
    text = text.replace(/`(.*?)`/g, '<code class="bg-muted/50 border border-border/30 px-2 py-1 rounded text-sm font-mono text-primary">$1</code>');
    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors inline-flex items-center gap-1">$1 <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      {parseContent(content)}
    </div>
  );
};

export default AdvancedMarkdownRenderer;
