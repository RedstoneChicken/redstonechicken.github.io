
import { useState } from "react";
import CustomImageDialog from "@/components/CustomImageDialog";
import { Maximize } from "lucide-react";

interface ImageGalleryProps {
  images: { url: string; alt: string }[];
  variant?: "standalone" | "inline";
  maxWidth?: string;
}

const ImageGallery = ({ 
  images, 
  variant = "standalone",
  maxWidth = "100%"
}: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (variant === "inline") {
    return (
      <div className="my-6 mx-auto" style={{ maxWidth }}>
        <CustomImageDialog
          imageUrl={images[activeIndex].url}
          alt={images[activeIndex].alt}
          trigger={
            <div className="glass-panel rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/40 hover:border-primary border border-white/10 transition-all">
              <div className="aspect-video relative">
                <img 
                  src={images[activeIndex].url} 
                  alt={images[activeIndex].alt} 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
                  <span className="bg-background/80 text-foreground px-3 py-1 rounded-md text-sm">Click to enlarge</span>
                </div>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
                  <Maximize className="h-4 w-4 text-foreground" />
                </div>
              </div>
            </div>
          }
        />

        {images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2 snap-x scrollbar-thin">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer transition-all rounded-lg overflow-hidden flex-shrink-0 w-16 border ${
                  activeIndex === index ? 'border-primary' : 'border-white/5 hover:border-primary'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="aspect-square">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <CustomImageDialog
        imageUrl={images[activeIndex].url}
        alt={images[activeIndex].alt}
        trigger={
          <div className="glass-panel rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary border border-white/10 hover:border-primary transition-all">
            <div className="aspect-video relative">
              <img 
                src={images[activeIndex].url} 
                alt={images[activeIndex].alt} 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
                <span className="bg-background/80 text-foreground px-3 py-1 rounded-md text-sm">Click to enlarge</span>
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
                <Maximize className="h-4 w-4 text-foreground" />
              </div>
            </div>
          </div>
        }
      />
      
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-2 snap-x">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all rounded-lg overflow-hidden flex-shrink-0 border ${
                activeIndex === index ? 'border-primary' : 'border-white/5 hover:border-primary'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="aspect-square w-16">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
