import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm",
        outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground rounded-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-gold underline-offset-4 hover:underline",
        // Luxury variants - for light backgrounds
        luxury: "bg-forest border border-forest text-ivory hover:bg-forest-dark tracking-wider uppercase text-xs rounded-sm",
        luxuryOutline: "bg-transparent border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold tracking-wider uppercase text-xs rounded-sm",
        luxuryGold: "bg-gold text-charcoal hover:bg-gold-muted tracking-wider uppercase text-xs font-semibold rounded-sm",
        // Dark section variants
        luxuryOutlineDark: "bg-transparent border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold tracking-wider uppercase text-xs rounded-sm",
        luxuryGoldDark: "bg-gold text-charcoal hover:bg-gold-muted tracking-wider uppercase text-xs font-semibold rounded-sm",
        // Hero variants for dark overlays
        hero: "bg-transparent border-2 border-ivory/30 text-ivory hover:bg-ivory/10 hover:border-ivory/60 tracking-widest uppercase text-xs px-8 py-6 rounded-none",
        heroGold: "bg-gold/90 border-2 border-gold text-charcoal hover:bg-gold tracking-widest uppercase text-xs px-8 py-6 font-semibold rounded-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
