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
        // Luxury variants
        luxury: "bg-forest border border-gold/20 text-cream hover:bg-forest-dark hover:border-gold/40 tracking-wider uppercase text-xs rounded-sm",
        luxuryOutline:
  "border transition-all duration-500 ease-out " +
  "border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] " +
  "hover:shadow-[0_0_35px_hsl(var(--forest-dark)_/_0.45)] " +
  "hover:-translate-y-0.5 " +
  "dark:border-gold dark:text-gold " +
  "dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]",
  luxuryGold: "border-2 tracking-widest uppercase text-xs px-8 py-6 font-semibold rounded-none " +
          /* LIGHT MODE (DEFAULT) */
          "bg-[hsl(var(--forest-dark))] border-[hsl(var(--forest-dark))] text-cream " +
          "hover:bg-[hsl(var(--forest-dark))]/90 " +

          /* DARK MODE */
          "dark:bg-gold/90 dark:border-gold dark:text-charcoal " +
          "dark:hover:bg-gold-muted",
           hero:
          "bg-transparent border-2 tracking-widest uppercase text-xs px-8 py-6 rounded-none " +
          "border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] " +
          "hover:bg-[hsl(var(--forest-dark))]/10 hover:border-[hsl(var(--forest-dark))] " +
          "transition-all duration-500 ease-out " +
          "dark:border-cream/30 dark:text-cream dark:hover:bg-cream/10 dark:hover:border-cream/60",
        heroGold:
                    "border-2 tracking-widest uppercase text-xs px-8 py-6 font-semibold rounded-none " +
          /* LIGHT MODE (DEFAULT) */
          "bg-[hsl(var(--forest-dark))] border-[hsl(var(--forest-dark))] text-cream " +
          "hover:bg-[hsl(var(--forest-dark))]/90 " +

          /* DARK MODE */
          "dark:bg-gold/90 dark:border-gold dark:text-charcoal " +
          "dark:hover:bg-gold-muted",
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
