import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
}

const EnhancedMarkdownRenderer = ({ content, className }: EnhancedMarkdownRendererProps) => {
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (id: string) => {
    const newExpanded = new Set(expandedDropdowns);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDropdowns(newExpanded);
  };

  // Parse and render dropdowns
  const processDropdowns = (text: string) => {
    const dropdownRegex = /\[dropdown\](.*?)\[\/dropdown\]/gs;
    let dropdownCounter = 0;
    
    return text.replace(dropdownRegex, (match, content) => {
      const dropdownId = `dropdown-${dropdownCounter++}`;
      const lines = content.trim().split('\n');
      const title = lines[0] || 'Dropdown';
      const dropdownContent = lines.slice(1).join('\n');
      const isExpanded = expandedDropdowns.has(dropdownId);
      
      return `<div class="dropdown-section" data-dropdown-id="${dropdownId}">
        <button class="dropdown-trigger" data-dropdown-trigger="${dropdownId}" aria-expanded="${isExpanded}">
          ${title}
        </button>
        <div class="dropdown-content" style="display: ${isExpanded ? 'block' : 'none'}">
          ${dropdownContent}
        </div>
      </div>`;
    });
  };

  // Check if content contains HTML tags or dropdowns
  const containsHTML = /<[^>]*>/g.test(content) || /\[dropdown\]/g.test(content);
  
  // If content contains HTML or dropdowns, process and render it
  if (containsHTML) {
    const processedContent = processDropdowns(content);
    
    return (
      <div 
        className={cn("prose prose-invert max-w-none enhanced-markdown", className)}
        dangerouslySetInnerHTML={{ __html: processedContent }}
        style={{
          color: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.hasAttribute('data-dropdown-trigger')) {
            const dropdownId = target.getAttribute('data-dropdown-trigger');
            if (dropdownId) {
              toggleDropdown(dropdownId);
              // Find and toggle the content
              const content = target.nextElementSibling as HTMLElement;
              if (content) {
                const isExpanded = expandedDropdowns.has(dropdownId);
                content.style.display = isExpanded ? 'block' : 'none';
                target.setAttribute('aria-expanded', String(isExpanded));
              }
            }
          }
        }}
      />
    );
  }

  // Otherwise, use markdown rendering
  return (
    <div className={cn("prose prose-invert max-w-none enhanced-markdown", className)}>
      <ReactMarkdown
        components={{
          // Headers with reduced spacing
          h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 mt-8 text-foreground border-b border-border/30 pb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3 mt-6 text-foreground border-b border-border/20 pb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-semibold mb-2 mt-5 text-foreground">{children}</h3>,
          h4: ({ children }) => <h4 className="text-xl font-medium mb-2 mt-4 text-foreground">{children}</h4>,
          h5: ({ children }) => <h5 className="text-lg font-medium mb-2 mt-3 text-foreground">{children}</h5>,
          h6: ({ children }) => <h6 className="text-base font-medium mb-2 mt-3 text-foreground">{children}</h6>,
          
          // Paragraphs with reduced spacing
          p: ({ children }) => {
            const childText = typeof children === 'string' ? children : '';
            const isCentered = childText.includes('[center]') || childText.includes('<center>');
            
            if (isCentered) {
              return <p className="mb-4 text-muted-foreground leading-relaxed text-lg text-center">{children}</p>;
            }
            
            return <p className="mb-4 text-muted-foreground leading-relaxed text-lg text-left">{children}</p>;
          },
          
          // Lists with reduced spacing
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground text-lg ml-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground text-lg ml-4">{children}</ol>,
          li: ({ children }) => <li className="text-muted-foreground leading-relaxed">{children}</li>,
          
          // Links with better styling
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors font-medium"
            >
              {children}
            </a>
          ),
          
          // Images - No border, better centering
          img: ({ src, alt, title }) => (
            <div className="flex justify-center my-6">
              <img 
                src={src} 
                alt={alt || ''} 
                title={title}
                className="max-w-full h-auto rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                style={{ 
                  display: 'block',
                  margin: '0 auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
            </div>
          ),
          
          // Videos and iframes
          iframe: ({ src, title, width, height, ...props }) => (
            <div className="flex justify-center my-6">
              <iframe 
                src={src}
                title={title}
                width={width}
                height={height}
                className="rounded-xl shadow-xl max-w-full border border-border/20"
                {...props}
              />
            </div>
          ),
          
          // Enhanced code blocks
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted/70 border border-border/30 px-3 py-1 rounded-lg text-base font-mono text-primary font-medium">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-muted/50 border border-border/30 p-6 rounded-xl overflow-x-auto mb-6 shadow-lg">
                <code className="text-base font-mono text-foreground">{children}</code>
              </pre>
            );
          },
          
          // Enhanced blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/60 bg-muted/20 pl-6 pr-4 py-4 my-6 italic text-muted-foreground text-lg rounded-r-xl shadow-sm">
              {children}
            </blockquote>
          ),
          
          // Enhanced tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-border/30 shadow-lg">
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border/30 bg-muted/50 px-4 py-3 text-left font-semibold text-foreground text-lg">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/20 px-4 py-3 text-muted-foreground text-lg">
              {children}
            </td>
          ),
          
          // Enhanced horizontal rules
          hr: () => <hr className="my-8 border-t-2 border-border/30" />,
          
          // Enhanced text formatting
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-primary/90">{children}</em>,
          del: ({ children }) => <del className="line-through opacity-60">{children}</del>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default EnhancedMarkdownRenderer;
