
export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoId: string;
  type: 'tutorial' | 'showcase' | 'update' | 'behind-scenes';
  publishDate: string;
  views: string;
  featured?: boolean;
}

export const videosData: VideoData[] = [
  {
    id: "redstone-mechanics-v3",
    title: "Redstone Mechanics Mod v3.0 - Complete Showcase & Tutorial",
    description: "Deep dive into the latest redstone mechanics features and improvements",
    videoId: "dQw4w9WgXcQ",
    type: "tutorial",
    publishDate: "2024-01-15",
    views: "25K",
    featured: true
  },
  {
    id: "redstone-mechanics-v25",
    title: "Redstone Mechanics Mod v2.5 Update",
    description: "Check out the new features and improvements in version 2.5",
    videoId: "dQw4w9WgXcQ",
    type: "update",
    publishDate: "2024-01-10",
    views: "15K"
  },
  {
    id: "modern-house-tutorial",
    title: "MCPE House Tutorial - Modern Redstone Base",
    description: "Learn how to build an amazing modern house with hidden redstone features",
    videoId: "dQw4w9WgXcQ",
    type: "tutorial",
    publishDate: "2024-01-08",
    views: "32K"
  },
  {
    id: "contraptions-pack-15",
    title: "New Redstone Contraptions Pack - Update 1.5",
    description: "Check out the latest redstone contraptions and mechanisms in our newest pack",
    videoId: "dQw4w9WgXcQ",
    type: "update",
    publishDate: "2024-01-05",
    views: "18K"
  },
  {
    id: "castle-showcase",
    title: "Epic Redstone Castle Showcase",
    description: "Tour our massive redstone-powered castle with automated defenses",
    videoId: "dQw4w9WgXcQ",
    type: "showcase",
    publishDate: "2024-01-03",
    views: "45K"
  },
  {
    id: "behind-scenes-contraptions",
    title: "Behind the Scenes - Making Redstone Contraptions",
    description: "See how we design and build our complex redstone mechanisms",
    videoId: "dQw4w9WgXcQ",
    type: "behind-scenes",
    publishDate: "2024-01-01",
    views: "12K"
  }
];

// Helper functions
export const getFeaturedVideo = (): VideoData | undefined => {
  return videosData.find(video => video.featured);
};

export const getLatestVideos = (count: number = 6): VideoData[] => {
  return videosData
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const getVideosByType = (type: VideoData['type']): VideoData[] => {
  return videosData.filter(video => video.type === type);
};

export const formatVideoDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return 'Posted today';
  } else if (diffDays === 1) {
    return 'Posted yesterday';
  } else if (diffDays < 7) {
    return `Posted ${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
  }
};
