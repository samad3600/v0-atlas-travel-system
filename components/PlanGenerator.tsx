'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface AgentStep {
  agent: string;
  thinking: string;
  response?: string;
  isComplete?: boolean;
}

interface PlanGeneratorProps {
  isVisible: boolean;
  agentSteps: AgentStep[];
  error?: string;
}

export function PlanGenerator({
  isVisible,
  agentSteps,
  error,
}: PlanGeneratorProps) {
  if (!isVisible) return null;

  return (
    <div className="space-y-4 mt-8">
      {agentSteps.map((step, index) => (
        <Card
          key={index}
          className="p-5 bg-card border border-border overflow-hidden"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {step.isComplete ? (
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                )}
              </div>
              <h3 className="font-bold text-primary text-lg">{step.agent}</h3>
            </div>

            {step.response && (
              <div className="mt-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {step.response}
              </div>
            )}

            {!step.response && (
              <div className="text-sm text-muted-foreground italic">
                {step.thinking}
              </div>
            )}
          </div>
        </Card>
      ))}

      {error && (
        <Card className="p-4 bg-destructive/10 border border-destructive">
          <p className="text-destructive text-sm font-semibold">Error: {error}</p>
        </Card>
      )}
    </div>
  );
}
