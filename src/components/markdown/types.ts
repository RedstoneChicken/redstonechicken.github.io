
export interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
}

export interface ParsedElement {
  type: 'heading' | 'paragraph' | 'list' | 'blockquote' | 'code' | 'html' | 'hr' | 'dropdown';
  content: React.ReactNode;
  level?: number;
  ordered?: boolean;
  language?: string;
  raw?: string;
}

export interface ListItem {
  content: React.ReactNode;
  indent: number;
}

export interface BlockElement {
  type: string;
  content: string;
  attributes?: Record<string, string>;
  children?: BlockElement[];
}
