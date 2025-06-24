
import React from 'react';

export interface MediaParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseMedia = (lines: string[], startIndex: number): MediaParseResult | null => {
  const line = lines[startIndex];
  const mediaMatch = line.match(/^\[(media|video)\](https?:\/\/[^\s]+)$/);
  
  if (!mediaMatch) {
    return null;
  }

  const url = mediaMatch[2];
  let embedUrl = url;

  // Convert YouTube URLs to embed format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const element = (
    <div key={`media-${startIndex}`} className="my-4">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <iframe 
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Embedded video"
        />
      </div>
    </div>
  );

  return { element, consumed: 1 };
};
