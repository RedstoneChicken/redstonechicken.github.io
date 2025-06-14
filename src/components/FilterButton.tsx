import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const FilterButton = ({ active, onClick, children, className }: FilterButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? "default" : "outline"}
      size="sm"
      className={cn(
        "transition-all duration-200 hover:scale-105 active:scale-95",
        active 
          ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
          : "hover:bg-secondary/80",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default FilterButton;
