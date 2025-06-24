
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group focus-ring backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg hover:shadow-primary/25 hover:shadow-xl border border-primary/20 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive/90 text-destructive-foreground hover:bg-destructive shadow-lg hover:shadow-destructive/25 hover:shadow-xl border border-destructive/20 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-border/60 bg-background/80 backdrop-blur-md hover:bg-accent/50 hover:text-accent-foreground hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary/60 backdrop-blur-md shadow-lg hover:shadow-secondary/20 border border-secondary/30 hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (asChild) {
      // When using asChild, we can't add extra elements, so we just return the slotted child
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    // When not using asChild, we can safely add the glow effect
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* AI-style glow effect */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
