
import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  images?: string[];
}

const MarkdownRenderer = ({ content, images = [] }: MarkdownRendererProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const result = [];
    let currentList = [];
    let listType = null;
    let dropdownCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        continue;
      }

      // Headers with improved styling
      if (line.startsWith('###')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h3 key={i} className="text-lg font-semibold mt-8 mb-4 text-primary border-b border-border/30 pb-2">{line.replace('###', '').trim()}</h3>);
      } else if (line.startsWith('##')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h2 key={i} className="text-xl font-bold mt-10 mb-6 text-primary border-b border-border/30 pb-3">{line.replace('##', '').trim()}</h2>);
      } else if (line.startsWith('#')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h1 key={i} className="text-2xl font-bold mt-12 mb-8 text-primary border-b border-border/30 pb-4">{line.replace('#', '').trim()}</h1>);
      }
      // Collapsible sections
      else if (line.startsWith('[dropdown]')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const title = line.replace('[dropdown]', '').trim();
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
      // Lists with improved styling
      else if (line.match(/^[-*+]\s/)) {
        if (listType !== 'ul') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType));
          }
          currentList = [];
          listType = 'ul';
        }
        currentList.push(line.replace(/^[-*+]\s/, ''));
      } else if (line.match(/^\d+\.\s/)) {
        if (listType !== 'ol') {
          if (currentList.length > 0) {
            result.push(renderList(currentList, listType));
          }
          currentList = [];
          listType = 'ol';
        }
        currentList.push(line.replace(/^\d+\.\s/, ''));
      }
      // Image placeholders with better styling
      else if (line.startsWith('[image]')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        const imageIndex = parseInt(line.replace('[image]', '').trim()) || 0;
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
        result.push(<p key={i} className="mb-6 text-muted-foreground leading-relaxed text-base">{formatInlineText(line)}</p>);
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
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-primary/80">$1</em>');
    // Handle inline code
    text = text.replace(/`(.*?)`/g, '<code class="bg-muted/50 border border-border/30 px-2 py-1 rounded text-sm font-mono text-primary">$1</code>');
    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors inline-flex items-center gap-1">$1 <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {parseContent(content)}
    </div>
  );
};

export default MarkdownRenderer;
