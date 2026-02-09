import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
}

const variantStyles: Record<RevealVariant, { hidden: CSSProperties; visible: CSSProperties }> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(24px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-24px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(24px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    hidden: { opacity: 0, transform: "scale(0.96)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const styles = variantStyles[variant];
  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? styles.visible : styles.hidden),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, filter ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
};

interface StaggerRevealProps {
  children: ReactNode[];
  baseDelay?: number;
  staggerDelay?: number;
  variant?: RevealVariant;
  duration?: number;
  threshold?: number;
  className?: string;
  childClassName?: string;
}

/**
 * Staggers reveal animations across children with incremental delays.
 * Wraps each child in a ScrollReveal.
 */
const StaggerReveal = ({
  children,
  baseDelay = 0,
  staggerDelay = 120,
  variant = "fade-up",
  duration = 700,
  threshold = 0.1,
  className = "",
  childClassName = "",
}: StaggerRevealProps) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          variant={variant}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          threshold={threshold}
          className={childClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

export { ScrollReveal, StaggerReveal };
export type { RevealVariant };
