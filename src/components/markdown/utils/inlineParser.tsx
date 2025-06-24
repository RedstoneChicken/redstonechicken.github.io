
import React from 'react';
import { INLINE_PATTERNS } from './inlinePatterns';
import { processEscapeCharacters } from './textUtils';
import {
  createStrongElement,
  createEmphasisElement,
  createStrikethroughElement,
  createHighlightElement,
  createCodeElement,
  createLinkElement,
  createImageElement,
  createLinkedImageElement,
  createAutoLinkElement,
  createHtmlElement
} from './elementCreators';

export const parseInlineElements = (text: string): React.ReactNode => {
  if (!text) return text;
  
  console.log('Parsing inline elements for text:', text);
  
  try {
    let processedText = processEscapeCharacters(text);
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let elementId = 0;

    // Create pattern array for matching - order matters for precedence
    const allPatterns = [
      { pattern: INLINE_PATTERNS.linkedImage, type: 'linkedImage' },
      { pattern: INLINE_PATTERNS.image, type: 'image' },
      { pattern: INLINE_PATTERNS.link, type: 'link' },
      { pattern: INLINE_PATTERNS.autoLink, type: 'autoLink' },
      { pattern: INLINE_PATTERNS.strong[0], type: 'strong' },
      { pattern: INLINE_PATTERNS.strong[1], type: 'strong' },
      { pattern: INLINE_PATTERNS.emphasis[0], type: 'emphasis' },
      { pattern: INLINE_PATTERNS.emphasis[1], type: 'emphasis' },
      { pattern: INLINE_PATTERNS.strikethrough, type: 'strikethrough' },
      { pattern: INLINE_PATTERNS.highlight, type: 'highlight' },
      { pattern: INLINE_PATTERNS.code, type: 'code' },
      { pattern: INLINE_PATTERNS.html, type: 'html' }
    ];

    // Find all matches across all patterns
    const allMatches: Array<{ match: RegExpExecArray; type: string }> = [];
    
    allPatterns.forEach(({ pattern, type }) => {
      // Create a fresh regex instance to avoid state issues
      const regex = new RegExp(pattern.source, pattern.flags);
      let match;
      
      while ((match = regex.exec(processedText)) !== null) {
        console.log(`Found ${type} match:`, match[0], 'at index:', match.index);
        allMatches.push({ match, type });
        // Prevent infinite loop for zero-width matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    });

    // Sort matches by index to process them in order
    allMatches.sort((a, b) => a.match.index - b.match.index);
    console.log('All matches sorted:', allMatches.map(m => ({ type: m.type, text: m.match[0], index: m.match.index })));

    // Remove overlapping matches - keep the first one (highest priority)
    const nonOverlappingMatches: Array<{ match: RegExpExecArray; type: string }> = [];
    let lastEnd = 0;

    allMatches.forEach(({ match, type }) => {
      if (match.index >= lastEnd) {
        nonOverlappingMatches.push({ match, type });
        lastEnd = match.index + match[0].length;
        console.log(`Keeping ${type} match:`, match[0]);
      } else {
        console.log(`Skipping overlapping ${type} match:`, match[0]);
      }
    });

    console.log('Non-overlapping matches:', nonOverlappingMatches.map(m => ({ type: m.type, text: m.match[0] })));

    // Process non-overlapping matches and build React elements
    nonOverlappingMatches.forEach(({ match, type }) => {
      // Add text before this match
      if (match.index > lastIndex) {
        const textBefore = processedText.slice(lastIndex, match.index);
        if (textBefore) {
          console.log('Adding text before match:', textBefore);
          parts.push(textBefore);
        }
      }

      // Create the appropriate React element
      const key = `${type}-${elementId++}`;
      
      switch (type) {
        case 'strong':
          console.log('Creating strong element for:', match[1]);
          parts.push(createStrongElement(match[1], key));
          break;
        case 'emphasis':
          parts.push(createEmphasisElement(match[1], key));
          break;
        case 'strikethrough':
          parts.push(createStrikethroughElement(match[1], key));
          break;
        case 'highlight':
          parts.push(createHighlightElement(match[1], key));
          break;
        case 'code':
          parts.push(createCodeElement(match[1], key));
          break;
        case 'linkedImage':
          const linkedImgTitle = match[3] || match[1];
          const linkedImgUrl = match[4];
          const linkedImgLinkTitle = match[5] || '';
          parts.push(createLinkedImageElement(match[2], match[1], linkedImgTitle, linkedImgUrl, linkedImgLinkTitle, key));
          break;
        case 'link':
          const linkTitle = match[3] || '';
          console.log('Creating link element:', { href: match[2], title: linkTitle, content: match[1] });
          // Only display the link text (match[1]), not the URL
          parts.push(createLinkElement(match[2], linkTitle, match[1], key));
          break;
        case 'image':
          const imgTitle = match[3] || match[1];
          parts.push(createImageElement(match[2], match[1], imgTitle, key));
          break;
        case 'autoLink':
          // For auto-links, we show the URL since there's no separate link text
          parts.push(createAutoLinkElement(match[0], key));
          break;
        case 'html':
          parts.push(createHtmlElement(match[0], key));
          break;
      }

      lastIndex = match.index + match[0].length;
    });

    // Add remaining text
    if (lastIndex < processedText.length) {
      const remainingText = processedText.slice(lastIndex);
      if (remainingText) {
        console.log('Adding remaining text:', remainingText);
        parts.push(remainingText);
      }
    }

    console.log('Final parts:', parts);
    // Return the parsed content - if no matches found, return original text
    return parts.length > 0 ? <>{parts}</> : text;
  } catch (error) {
    console.error('Error parsing inline elements:', error);
    return text;
  }
};

export const parseSimpleInlineElements = (text: string): string => {
  if (!text) return text;
  
  try {
    let processedText = processEscapeCharacters(text);
    
    // Process in order to avoid conflicts - images and links first
    processedText = processedText.replace(INLINE_PATTERNS.linkedImage, '<a href="$4" title="$5" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer"><img src="$2" alt="$1" title="$3" class="max-w-full h-auto rounded-lg" /></a>');
    processedText = processedText.replace(INLINE_PATTERNS.image, '<img src="$2" alt="$1" title="$3" class="max-w-full h-auto rounded-lg" />');
    // Fixed: Only show the link text ($1), not the URL
    processedText = processedText.replace(INLINE_PATTERNS.link, '<a href="$2" title="$3" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
    processedText = processedText.replace(INLINE_PATTERNS.autoLink, '<a href="$1" class="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Then process text formatting
    processedText = processedText.replace(INLINE_PATTERNS.strong[0], '<strong class="font-semibold text-foreground">$1</strong>');
    processedText = processedText.replace(INLINE_PATTERNS.strong[1], '<strong class="font-semibold text-foreground">$1</strong>');
    processedText = processedText.replace(INLINE_PATTERNS.emphasis[0], '<em class="italic text-primary/80">$1</em>');
    processedText = processedText.replace(INLINE_PATTERNS.emphasis[1], '<em class="italic text-primary/80">$1</em>');
    processedText = processedText.replace(INLINE_PATTERNS.strikethrough, '<del class="line-through text-muted-foreground">$1</del>');
    processedText = processedText.replace(INLINE_PATTERNS.highlight, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
    processedText = processedText.replace(INLINE_PATTERNS.code, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono text-primary">$1</code>');
    
    return processedText;
  } catch (error) {
    console.error('Error parsing simple inline elements:', error);
    return text;
  }
};
