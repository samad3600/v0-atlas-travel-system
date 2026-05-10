'use client';

import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <div className="mb-12 text-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent" />
      </div>

      <div className="mb-4 inline-block animate-in fade-in zoom-in duration-500">
        <Badge variant="outline" className="border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
          AI-Powered Travel Planning
        </Badge>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        ATLAS
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
        Experience travel planning powered by AI. Research destinations, create personalized itineraries, and get expert travel advice—all in one place.
      </p>

      {/* Decorative animated elements */}
      <div className="mt-6 flex justify-center gap-2 opacity-20 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-accent animate-pulse delay-100" />
        <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-200" />
      </div>
    </div>
  );
}
