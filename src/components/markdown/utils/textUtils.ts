
import { ESCAPE_CHARS } from './inlinePatterns';

export const processEscapeCharacters = (text: string): string => {
  let processedText = text;
  Object.entries(ESCAPE_CHARS).forEach(([escaped, actual]) => {
    processedText = processedText.replace(new RegExp(escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), actual);
  });
  return processedText;
};

export const findAllMatches = (text: string, patterns: Array<{ pattern: RegExp; type: string }>) => {
  const matches: Array<{ match: RegExpExecArray; type: string }> = [];
  
  patterns.forEach(({ pattern, type }) => {
    // Reset the regex lastIndex to avoid issues with global patterns
    pattern.lastIndex = 0;
    let match;
    // Create a new regex instance to avoid state issues
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push({ match, type });
      // Prevent infinite loop for zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
  });

  // Sort matches by index to process them in order
  return matches.sort((a, b) => a.match.index - b.match.index);
};
