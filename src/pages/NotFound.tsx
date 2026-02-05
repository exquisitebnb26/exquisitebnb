import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-warm dark:bg-charcoal">
      <div className="text-center px-6">
        <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
          Page Not Found
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">404</h1>
        <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <Button variant="luxuryOutline" size="lg" asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
