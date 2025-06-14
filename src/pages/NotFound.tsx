
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
          <div className="block mt-2">
            <Link to="/downloads" className="text-sm text-muted-foreground hover:text-primary">
              Browse Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
