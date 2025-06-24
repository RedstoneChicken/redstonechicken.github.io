
import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomImageDialogProps {
  trigger: ReactNode;
  imageUrl: string;
  alt: string;
  className?: string;
}

const CustomImageDialog = ({ 
  trigger, 
  imageUrl, 
  alt, 
  className 
}: CustomImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Start image animation immediately
    requestAnimationFrame(() => {
      setImageVisible(true);
      // Start backdrop animation with slight delay
      setTimeout(() => {
        setBackdropVisible(true);
      }, 50);
    });
  };

  const handleClose = () => {
    setBackdropVisible(false);
    setImageVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current === event.target) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4",
        "bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out",
        backdropVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className={cn(
        "relative max-w-4xl w-[90vw] max-h-[85vh]",
        "bg-background/95 backdrop-blur-sm rounded-lg border border-border/50",
        "shadow-2xl overflow-hidden transition-all duration-300 ease-out",
        imageVisible
          ? "opacity-100 scale-100 translate-y-0" 
          : "opacity-0 scale-95 translate-y-4"
      )}>
        <button
          onClick={handleClose}
          className={cn(
            "absolute top-3 right-3 z-[10000]",
            "bg-black/50 backdrop-blur-sm rounded-full p-2",
            "hover:bg-black/70 transition-colors shadow-lg",
            "text-white hover:text-white"
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <img
          ref={imageRef}
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
          decoding="sync"
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={handleOpen} className={className}>
        {trigger}
      </div>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default CustomImageDialog;
