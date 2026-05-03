'use client';

import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <div className="mb-12 text-center">
      <div className="mb-4 inline-block">
        <Badge variant="outline" className="border-primary text-primary bg-primary/5">
          AI-Powered Travel Planning
        </Badge>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-3">
        ATLAS
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Experience travel planning powered by AI. Research destinations, create personalized itineraries, and get expert travel advice—all in one place.
      </p>
    </div>
  );
}
