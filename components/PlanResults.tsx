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
    <Card className="mt-8 bg-card border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Your Travel Plan</h2>
          <div className="flex gap-2">
            <Button
              onClick={onCopy}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-muted"
            >
              Copy
            </Button>
            <Button
              onClick={onClearCache}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-muted"
            >
              Clear
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {plan}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
