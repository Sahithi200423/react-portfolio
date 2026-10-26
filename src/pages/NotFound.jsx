import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center space-y-6">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404 Error
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          The page or journal entry you are looking for doesn't exist or has moved.
        </p>
      </div>

      <div>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
