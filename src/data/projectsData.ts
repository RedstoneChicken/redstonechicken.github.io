
export interface Project {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  type: 'mod' | 'resource_pack';
  version: string;
  mc_versions: string[];
  image_url: string;
  download_url: string;
  download_count: number;
  updated_at: string;
  created_at: string;
  featured?: boolean;
  publishDate?: string;
  lastUpdated?: string;
  downloadCount: number;
  mcVersions: string[];
  image: string;
  shortDescription: string;
}

export const projects: Project[] = [
  {
    id: "redstone-enhanced",
    slug: "redstone-enhanced",
    name: "Redstone Enhanced",
    short_description: "Advanced redstone components for complex automation",
    description: "Redstone Enhanced brings powerful new redstone components to Minecraft, enabling complex automation systems and logic circuits that were previously impossible. This mod includes advanced timing components, signal processors, and wireless redstone capabilities.\n\nBuilt for both beginners and experts, it seamlessly integrates with vanilla redstone while providing powerful new tools for your contraptions. Perfect for technical players who want to push the boundaries of what's possible with redstone.\n\nFeatures include custom logic gates, advanced repeaters, signal amplifiers, and much more. All components are designed to feel like natural extensions of vanilla Minecraft's redstone system.",
    type: "mod",
    version: "1.5.2",
    mc_versions: ["1.21.0", "1.20.6", "1.20.4"],
    image_url: "https://source.unsplash.com/800x600?minecraft,redstone",
    download_url: "/downloads/redstone-enhanced-1.5.2.mcpack",
    download_count: 15420,
    updated_at: "2024-01-15T10:30:00Z",
    created_at: "2023-06-01T15:20:00Z",
    featured: true,
    publishDate: "2023-06-01T15:20:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    downloadCount: 15420,
    mcVersions: ["1.21.0", "1.20.6", "1.20.4"],
    image: "https://source.unsplash.com/800x600?minecraft,redstone",
    shortDescription: "Advanced redstone components for complex automation"
  },
  {
    id: "modern-ui-pack",
    slug: "modern-ui-pack", 
    name: "Modern UI Pack",
    short_description: "Clean and modern interface textures",
    description: "Transform your Minecraft interface with this sleek, modern UI pack. Features clean lines, improved readability, and a cohesive design language throughout all menus and interfaces.\n\nThis texture pack reimagines every UI element in Minecraft with a modern aesthetic while maintaining functionality and clarity. From inventory screens to crafting tables, every interface has been carefully redesigned.\n\nCompatible with most popular mods and includes support for custom interfaces. The pack maintains the spirit of Minecraft while bringing it into the modern era of design.",
    type: "resource_pack",
    version: "2.1.0",
    mc_versions: ["1.21.0", "1.20.6"],
    image_url: "https://source.unsplash.com/800x600?ui,interface",
    download_url: "/downloads/modern-ui-pack-2.1.0.mcpack",
    download_count: 8930,
    updated_at: "2024-01-10T14:45:00Z",
    created_at: "2023-08-15T09:10:00Z",
    publishDate: "2023-08-15T09:10:00Z",
    lastUpdated: "2024-01-10T14:45:00Z",
    downloadCount: 8930,
    mcVersions: ["1.21.0", "1.20.6"],
    image: "https://source.unsplash.com/800x600?ui,interface",
    shortDescription: "Clean and modern interface textures"
  },
  {
    id: "automation-plus",
    slug: "automation-plus",
    name: "Automation Plus",
    short_description: "Next-level automation tools and machinery",
    description: "Automation Plus takes Minecraft automation to the next level with advanced machinery, smart pipes, and intelligent storage systems. Build fully automated factories and processing plants with ease.\n\nThis comprehensive mod includes conveyor belts, sorting systems, automated crafting, and resource processing machines. Everything is designed to work together seamlessly for maximum efficiency.\n\nPerfect for players who love building complex automated systems and want more sophisticated tools than vanilla Minecraft provides. Includes extensive documentation and tutorial systems.",
    type: "mod",
    version: "3.0.1",
    mc_versions: ["1.21.0", "1.20.6", "1.20.4", "1.19.4"],
    image_url: "https://source.unsplash.com/800x600?factory,automation",
    download_url: "/downloads/automation-plus-3.0.1.mcpack",
    download_count: 12750,
    updated_at: "2024-01-08T16:20:00Z",
    created_at: "2023-05-20T11:30:00Z",
    publishDate: "2023-05-20T11:30:00Z",
    lastUpdated: "2024-01-08T16:20:00Z",
    downloadCount: 12750,
    mcVersions: ["1.21.0", "1.20.6", "1.20.4", "1.19.4"],
    image: "https://source.unsplash.com/800x600?factory,automation",
    shortDescription: "Next-level automation tools and machinery"
  }
];

export const findProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const findProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
