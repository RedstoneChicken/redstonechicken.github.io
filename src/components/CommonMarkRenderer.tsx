
import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommonMarkRendererProps {
  content: string;
  images?: string[];
  className?: string;
}

interface DropdownSection {
  id: string;
  title: string;
  content: string;
}

const CommonMarkRenderer = ({ content, images = [], className }: CommonMarkRendererProps) => {
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

  // Parse and process the content following CommonMark spec
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const result = [];
    let currentParagraph = [];
    let currentList = [];
    let listType = null;
    let codeBlock = null;
    let dropdownCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Handle code blocks (fenced code blocks)
      if (trimmedLine.startsWith('```')) {
        if (codeBlock) {
          // End code block
          result.push(renderCodeBlock(codeBlock.content, codeBlock.language, i));
          codeBlock = null;
        } else {
          // Start code block
          finalizeParagraph(currentParagraph, result);
          finalizeList(currentList, listType, result);
          const language = trimmedLine.slice(3).trim();
          codeBlock = { content: [], language };
        }
        continue;
      }

      if (codeBlock) {
        codeBlock.content.push(line);
        continue;
      }

      // Handle custom dropdown sections (extension)
      if (trimmedLine.startsWith('[dropdown]')) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        
        const title = trimmedLine.replace('[dropdown]', '').trim();
        const dropdownId = `dropdown-${dropdownCount++}`;
        
        // Find content until [/dropdown]
        let dropdownContent = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('[/dropdown]')) {
          dropdownContent.push(lines[j]);
          j++;
        }
        i = j; // Skip to after [/dropdown]
        
        result.push(renderDropdown(dropdownId, title, dropdownContent.join('\n')));
        continue;
      }

      // Handle empty lines
      if (!trimmedLine) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        continue;
      }

      // Handle headings (ATX headings)
      const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        result.push(renderHeading(level, text, i));
        continue;
      }

      // Handle horizontal rules
      if (trimmedLine.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        result.push(<hr key={i} className="my-8 border-border" />);
        continue;
      }

      // Handle blockquotes
      if (trimmedLine.startsWith('>')) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        
        let blockquoteContent = [trimmedLine.slice(1).trim()];
        let j = i + 1;
        while (j < lines.length && lines[j].trim().startsWith('>')) {
          blockquoteContent.push(lines[j].trim().slice(1).trim());
          j++;
        }
        i = j - 1;
        
        result.push(
          <blockquote key={i} className="border-l-4 border-primary/30 pl-4 my-6 text-muted-foreground italic bg-muted/20 py-2 rounded-r-lg">
            {blockquoteContent.map((line, idx) => (
              <p key={idx} className="mb-2 last:mb-0">{parseInlineContent(line)}</p>
            ))}
          </blockquote>
        );
        continue;
      }

      // Handle lists
      const unorderedListMatch = trimmedLine.match(/^[-*+]\s+(.+)$/);
      const orderedListMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
      
      if (unorderedListMatch || orderedListMatch) {
        finalizeParagraph(currentParagraph, result);
        
        const newListType = unorderedListMatch ? 'ul' : 'ol';
        const content = unorderedListMatch ? unorderedListMatch[1] : orderedListMatch![2];
        
        if (listType !== newListType) {
          finalizeList(currentList, listType, result);
          currentList = [];
          listType = newListType;
        }
        
        currentList.push(content);
        continue;
      }

      // Handle image placeholders (extension)
      if (trimmedLine.startsWith('[image]')) {
        finalizeParagraph(currentParagraph, result);
        finalizeList(currentList, listType, result);
        
        const imageIndex = parseInt(trimmedLine.replace('[image]', '').trim()) || 0;
        result.push(renderImagePlaceholder(imageIndex, images, i));
        continue;
      }

      // Regular paragraph content
      finalizeList(currentList, listType, result);
      currentParagraph.push(line);
    }

    // Finalize any remaining content
    finalizeParagraph(currentParagraph, result);
    finalizeList(currentList, listType, result);
    if (codeBlock) {
      result.push(renderCodeBlock(codeBlock.content, codeBlock.language, -1));
    }

    return result;
  };

  const finalizeParagraph = (paragraph: string[], result: any[]) => {
    if (paragraph.length > 0) {
      const content = paragraph.join('\n').trim();
      if (content) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {parseInlineContent(content)}
          </p>
        );
      }
      paragraph.length = 0;
    }
  };

  const finalizeList = (list: string[], type: string | null, result: any[]) => {
    if (list.length > 0 && type) {
      const ListComponent = type === 'ol' ? 'ol' : 'ul';
      const className = type === 'ol' 
        ? "list-decimal list-inside mb-4 space-y-2 text-muted-foreground pl-4"
        : "list-disc list-inside mb-4 space-y-2 text-muted-foreground pl-4";
      
      result.push(
        <ListComponent key={`list-${result.length}`} className={className}>
          {list.map((item, idx) => (
            <li key={idx} className="leading-relaxed">{parseInlineContent(item)}</li>
          ))}
        </ListComponent>
      );
      list.length = 0;
    }
  };

  const renderHeading = (level: number, text: string, key: number) => {
    const baseClasses = "font-bold text-primary";
    const levelClasses = {
      1: "text-3xl mt-8 mb-6 border-b-2 border-border/30 pb-2",
      2: "text-2xl mt-6 mb-4 border-b border-border/20 pb-1",
      3: "text-xl mt-4 mb-3",
      4: "text-lg mt-4 mb-2",
      5: "text-base mt-3 mb-2",
      6: "text-sm mt-3 mb-2"
    };

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <HeadingTag 
        key={key} 
        className={cn(baseClasses, levelClasses[level as keyof typeof levelClasses])}
      >
        {parseInlineContent(text)}
      </HeadingTag>
    );
  };

  const renderCodeBlock = (content: string[], language: string, key: number) => {
    return (
      <pre key={key} className="bg-muted/50 p-4 rounded-lg overflow-x-auto mb-4 border border-border/30">
        <code className="text-sm font-mono text-foreground">
          {content.join('\n')}
        </code>
      </pre>
    );
  };

  const renderDropdown = (id: string, title: string, content: string) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <div key={id} className="border border-border/30 rounded-lg mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors border-2 border-transparent hover:border-primary/60"
        >
          <span className="font-medium text-foreground">{title}</span>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {isExpanded && (
          <div className="p-4 pt-0 border-t border-border/20">
            <div className="prose prose-invert max-w-none">
              <CommonMarkRenderer content={content} images={images} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderImagePlaceholder = (index: number, imageArray: string[] | undefined, key: number) => {
    // Safely handle the case where imageArray might be null, undefined, or not an array
    const safeImages = Array.isArray(imageArray) ? imageArray : [];
    const imageUrl = safeImages[index];
    
    if (imageUrl) {
      return (
        <div key={key} className="my-6">
          <img 
            src={imageUrl} 
            alt={`Description image ${index + 1}`}
            className="w-full rounded-lg shadow-lg border border-border/20"
          />
        </div>
      );
    }
    
    return (
      <div key={key} className="my-6 p-8 border-2 border-dashed border-muted rounded-lg text-center text-muted-foreground">
        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Image placeholder {index + 1}</p>
        <p className="text-sm opacity-75">No image available at this index</p>
      </div>
    );
  };

  // Parse inline content (bold, italic, code, links)
  const parseInlineContent = (text: string) => {
    const parts = [];
    let currentIndex = 0;
    
    // Regex patterns for inline formatting
    const patterns = [
      { type: 'code', regex: /`([^`]+)`/g },
      { type: 'bold', regex: /\*\*([^*]+)\*\*/g },
      { type: 'italic', regex: /\*([^*]+)\*/g },
      { type: 'link', regex: /\[([^\]]+)\]\(([^)]+)\)/g }
    ];

    let matches = [];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.regex.exec(text)) !== null) {
        matches.push({
          type: pattern.type,
          start: match.index,
          end: match.index + match[0].length,
          text: match[1],
          url: match[2] || null,
          full: match[0]
        });
      }
    });

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);

    // Process text with inline formatting
    matches.forEach((match, index) => {
      // Add text before this match
      if (match.start > currentIndex) {
        parts.push(text.slice(currentIndex, match.start));
      }

      // Add formatted content
      switch (match.type) {
        case 'bold':
          parts.push(<strong key={`bold-${index}`} className="font-semibold text-foreground">{match.text}</strong>);
          break;
        case 'italic':
          parts.push(<em key={`italic-${index}`} className="italic text-primary/80">{match.text}</em>);
          break;
        case 'code':
          parts.push(
            <code key={`code-${index}`} className="bg-muted/70 px-2 py-1 rounded text-sm font-mono text-primary border border-border/30">
              {match.text}
            </code>
          );
          break;
        case 'link':
          const isExternal = match.url?.startsWith('http');
          parts.push(
            <a 
              key={`link-${index}`}
              href={match.url} 
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors inline-flex items-center gap-1"
            >
              {match.text}
              {isExternal && <ExternalLink className="h-3 w-3" />}
            </a>
          );
          break;
      }

      currentIndex = match.end;
    });

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length === 0 ? text : parts;
  };

  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      {parseContent(content)}
    </div>
  );
};

export default CommonMarkRenderer;
