
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (variant === "inline") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button 
                className="group relative overflow-hidden rounded-lg hover:scale-[1.02] transition-all duration-300"
                onClick={() => setSelectedImage(item.url)}
              >
                <div className="aspect-video">
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </DialogTrigger>
            {/* Step 4: Larger close button for touch-friendly interaction */}
            <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-md overflow-hidden border-none">
              <div className="w-full h-full flex items-center justify-center p-4 relative">
                <img
                  src={item.url}
                  alt={item.description}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Grid layout for default variant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button 
                className="group relative overflow-hidden rounded-lg hover:scale-[1.02] transition-all duration-300"
                onClick={() => setSelectedImage(item.url)}
              >
                <div className="aspect-video">
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{item.description}</p>
                </div>
              </button>
            </DialogTrigger>
            {/* Step 4: Larger close button for touch-friendly interaction */}
            <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-md overflow-hidden border-none">
              <div className="w-full h-full flex items-center justify-center p-4 relative">
                <img
                  src={item.url}
                  alt={item.description}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default ModernImageGallery;
