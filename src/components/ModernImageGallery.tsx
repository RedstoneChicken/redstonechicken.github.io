
import { useState } from "react";
import CustomImageDialog from "@/components/CustomImageDialog";
import { Maximize } from "lucide-react";

interface MediaItem {
  url: string;
  type: "image" | "video";
  description: string;
}

interface ModernImageGalleryProps {
  media: MediaItem[];
  variant?: "grid" | "inline";
}

const ModernImageGallery = ({ media, variant = "grid" }: ModernImageGalleryProps) => {
  if (variant === "inline") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <CustomImageDialog
            key={index}
            imageUrl={item.url}
            alt={item.description}
            trigger={
              <button className="group relative overflow-hidden rounded-lg hover:scale-[1.02] transition-all duration-300">
                <div className="aspect-video">
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <CustomImageDialog
            key={index}
            imageUrl={item.url}
            alt={item.description}
            trigger={
              <button className="group relative overflow-hidden rounded-lg hover:scale-[1.02] transition-all duration-300">
                <div className="aspect-video">
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{item.description}</p>
                </div>
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ModernImageGallery;
