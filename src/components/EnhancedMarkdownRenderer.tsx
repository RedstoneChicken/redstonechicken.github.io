
import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { EnhancedMarkdownRendererProps } from './markdown/types';
import MarkdownParser from './markdown/MarkdownParser';

const EnhancedMarkdownRenderer = ({ content, className }: EnhancedMarkdownRendererProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const parseMarkdown = useMemo(() => {
    return (
      <MarkdownParser
        content={content}
        expandedSections={expandedSections}
        onToggleSection={toggleSection}
      />
    );
  }, [content, expandedSections, toggleSection]);

  return (
    <div className={cn("enhanced-markdown prose prose-invert max-w-none", className)}>
      <style>{`
        .enhanced-markdown {
          /* Custom CSS for enhanced markdown rendering */
          line-height: 1.6;
        }
        
        .enhanced-markdown h1, 
        .enhanced-markdown h2, 
        .enhanced-markdown h3, 
        .enhanced-markdown h4, 
        .enhanced-markdown h5, 
        .enhanced-markdown h6 {
          scroll-margin-top: 2rem;
        }
        
        .enhanced-markdown pre {
          tab-size: 2;
        }
        
        .enhanced-markdown blockquote {
          quotes: '"' '"' "'" "'";
        }
        
        .enhanced-markdown blockquote::before {
          content: open-quote;
        }
        
        .enhanced-markdown blockquote::after {
          content: close-quote;
        }
        
        /* Table styling */
        .enhanced-markdown table {
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .enhanced-markdown th,
        .enhanced-markdown td {
          border: 1px solid hsl(var(--border));
          padding: 0.75rem;
          text-align: left;
        }
        
        .enhanced-markdown th {
          background-color: hsl(var(--muted));
          font-weight: 600;
        }
        
        .enhanced-markdown tr:nth-child(even) {
          background-color: hsl(var(--muted) / 0.3);
        }
        
        /* Alert styling enhancement */
        .enhanced-markdown .alert {
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid;
        }
        
        /* Media embeds */
        .enhanced-markdown iframe {
          border-radius: 0.5rem;
        }
        
        /* Highlight and strikethrough */
        .enhanced-markdown mark {
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }
        
        .enhanced-markdown del {
          opacity: 0.7;
        }
        
        /* Support for custom CSS classes in HTML */
        .enhanced-markdown .text-center { text-align: center; }
        .enhanced-markdown .text-right { text-align: right; }
        .enhanced-markdown .text-left { text-align: left; }
        .enhanced-markdown .text-red { color: #ef4444; }
        .enhanced-markdown .text-green { color: #10b981; }
        .enhanced-markdown .text-blue { color: #3b82f6; }
        .enhanced-markdown .text-yellow { color: #f59e0b; }
        .enhanced-markdown .bg-yellow { background-color: #fef3c7; padding: 0.5rem; border-radius: 0.375rem; }
        .enhanced-markdown .bg-red { background-color: #fee2e2; padding: 0.5rem; border-radius: 0.375rem; }
        .enhanced-markdown .bg-green { background-color: #dcfce7; padding: 0.5rem; border-radius: 0.375rem; }
        .enhanced-markdown .bg-blue { background-color: #dbeafe; padding: 0.5rem; border-radius: 0.375rem; }
        .enhanced-markdown .border { border: 1px solid #374151; }
        .enhanced-markdown .rounded { border-radius: 0.375rem; }
        .enhanced-markdown .p-4 { padding: 1rem; }
        .enhanced-markdown .m-4 { margin: 1rem; }
        .enhanced-markdown .font-bold { font-weight: 700; }
        .enhanced-markdown .font-semibold { font-weight: 600; }
        .enhanced-markdown .italic { font-style: italic; }
        .enhanced-markdown .underline { text-decoration: underline; }
      `}</style>
      {parseMarkdown}
    </div>
  );
};

export default EnhancedMarkdownRenderer;
