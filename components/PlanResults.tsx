'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlanResultsProps {
  plan: string;
  isVisible: boolean;
  onCopy?: () => void;
  onClearCache?: () => void;
}

export function PlanResults({
  plan,
  isVisible,
  onCopy,
  onClearCache,
}: PlanResultsProps) {
  if (!isVisible) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="mt-8 bg-gradient-to-br from-card via-card to-card/50 border border-border/50 hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Travel Plan
              </h2>
              <p className="text-sm text-muted-foreground mt-1">AI-generated personalized itinerary</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onCopy}
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                Copy
              </Button>
              <Button
                onClick={onClearCache}
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg"
              >
                Clear
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[600px] pr-4 rounded-lg border border-border/30 p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {plan}
            </div>
          </ScrollArea>

          <div className="mt-6 pt-6 border-t border-border/30 flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Plan generated and cached for offline access
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
