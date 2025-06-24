
import React from 'react';

export const createStrongElement = (content: string, key: string) => (
  <strong key={key} className="font-semibold text-foreground">
    {content}
  </strong>
);

export const createEmphasisElement = (content: string, key: string) => (
  <em key={key} className="italic text-primary/80">
    {content}
  </em>
);

export const createStrikethroughElement = (content: string, key: string) => (
  <del key={key} className="line-through text-muted-foreground">
    {content}
  </del>
);

export const createHighlightElement = (content: string, key: string) => (
  <mark key={key} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
    {content}
  </mark>
);

export const createCodeElement = (content: string, key: string) => (
  <code key={key} className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-primary">
    {content}
  </code>
);

export const createLinkElement = (href: string, title: string, content: string, key: string) => (
  <a 
    key={key}
    href={href} 
    title={title}
    className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {content}
  </a>
);

export const createImageElement = (src: string, alt: string, title: string, key: string) => (
  <img 
    key={key}
    src={src} 
    alt={alt}
    title={title}
    className="max-w-full h-auto rounded-lg"
  />
);

export const createLinkedImageElement = (
  imgSrc: string, 
  imgAlt: string, 
  imgTitle: string, 
  linkHref: string, 
  linkTitle: string, 
  key: string
) => (
  <a 
    key={key}
    href={linkHref} 
    title={linkTitle}
    className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img 
      src={imgSrc} 
      alt={imgAlt}
      title={imgTitle}
      className="max-w-full h-auto rounded-lg"
    />
  </a>
);

export const createAutoLinkElement = (url: string, key: string) => {
  const displayUrl = url.startsWith('mailto:') ? url.substring(7) : url;
  return (
    <a 
      key={key}
      href={url}
      className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {displayUrl}
    </a>
  );
};

export const createHtmlElement = (html: string, key: string) => (
  <span 
    key={key}
    dangerouslySetInnerHTML={{ __html: html }} 
  />
);
