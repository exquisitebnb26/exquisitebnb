import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="text-center px-6">
        <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">
          Page Not Found
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-cream mb-6">404</h1>
        <p className="text-cream-muted text-lg mb-8 max-w-md mx-auto">
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
