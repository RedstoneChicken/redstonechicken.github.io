
import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextRendererProps {
  content: string;
  images?: string[];
}

const RichTextRenderer = ({ content, images = [] }: RichTextRendererProps) => {
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

      // Headers
      if (line.startsWith('###')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h3 key={i} className="text-lg font-semibold mt-6 mb-3 text-primary">{line.replace('###', '').trim()}</h3>);
      } else if (line.startsWith('##')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h2 key={i} className="text-xl font-bold mt-8 mb-4 text-primary">{line.replace('##', '').trim()}</h2>);
      } else if (line.startsWith('#')) {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<h1 key={i} className="text-2xl font-bold mt-8 mb-6 text-primary">{line.replace('#', '').trim()}</h1>);
      }
      // Dropdown sections
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
          <div key={dropdownId} className="border border-border rounded-lg mb-4">
            <button
              onClick={() => toggleSection(dropdownId)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium">{title}</span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {isExpanded && (
              <div className="p-4 pt-0 border-t border-border">
                <div className="prose prose-invert max-w-none">
                  {parseContent(dropdownContent.join('\n'))}
                </div>
              </div>
            )}
          </div>
        );
      }
      // Lists
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
      // Image placeholders
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
            <div key={i} className="my-6">
              <img 
                src={imageUrl} 
                alt={`Description image ${imageIndex + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          );
        } else {
          result.push(
            <div key={i} className="my-6 p-4 border border-dashed border-muted rounded-lg text-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2" />
              <p>Image placeholder {imageIndex + 1}</p>
            </div>
          );
        }
      }
      // Regular paragraphs
      else {
        if (currentList.length > 0) {
          result.push(renderList(currentList, listType));
          currentList = [];
          listType = null;
        }
        result.push(<p key={i} className="mb-4 text-muted-foreground leading-relaxed">{formatInlineText(line)}</p>);
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
      ? "list-decimal list-inside mb-4 space-y-1 text-muted-foreground"
      : "list-disc list-inside mb-4 space-y-1 text-muted-foreground";
    
    return (
      <ListComponent key={`list-${Math.random()}`} className={className}>
        {items.map((item, idx) => (
          <li key={idx}>{formatInlineText(item)}</li>
        ))}
      </ListComponent>
    );
  };

  const formatInlineText = (text: string) => {
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Handle inline code
    text = text.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {parseContent(content)}
    </div>
  );
};

export default RichTextRenderer;
