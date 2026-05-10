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
      <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-left duration-500">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <h2 className="text-lg font-semibold text-foreground">AI Agents Planning Your Trip</h2>
      </div>

      {agentSteps.map((step, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-left duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Card className="p-5 bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-accent/50 transition-all duration-300 overflow-hidden hover:shadow-lg">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

            <div className="relative space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {step.isComplete ? (
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-lg">{step.agent}</h3>
                  {step.isComplete && (
                    <span className="text-xs text-accent font-semibold">✓ Complete</span>
                  )}
                </div>
              </div>

              {step.response && (
                <div className="mt-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap animate-in fade-in duration-500">
                  {step.response}
                </div>
              )}

              {!step.response && (
                <div className="text-sm text-muted-foreground italic flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-muted-foreground border-t-primary rounded-full animate-spin" />
                  {step.thinking}
                </div>
              )}
            </div>
          </Card>
        </div>
      ))}

      {error && (
        <div className="animate-in fade-in slide-in-from-left duration-500">
          <Card className="p-4 bg-destructive/10 border border-destructive/50 hover:border-destructive transition-colors duration-300 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-destructive flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">!</div>
              <p className="text-destructive text-sm font-semibold">{error}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
