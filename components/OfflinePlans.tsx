'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cacheManager } from '@/app/lib/cache';
import { CachedPlan } from '@/app/lib/agents/types';

interface OfflinePlansProps {
  onLoadPlan: (plan: CachedPlan) => void;
  isVisible: boolean;
}

export function OfflinePlans({ onLoadPlan, isVisible }: OfflinePlansProps) {
  const [plans, setPlans] = useState<
    Array<{ id: string; destination: string; timestamp: number }>
  >([]);

  useEffect(() => {
    if (isVisible) {
      const cachedPlans = cacheManager.listPlans();
      setPlans(cachedPlans);
    }
  }, [isVisible]);

  if (!isVisible || plans.length === 0) return null;

  return (
    <Card className="p-6 bg-card border border-border mt-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Offline Plans Available
      </h3>
      <div className="space-y-2">
        {plans.map((plan) => {
          const date = new Date(plan.timestamp).toLocaleDateString();
          return (
            <div
              key={plan.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {plan.destination}
                </p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
              <Button
                onClick={() => {
                  const cachedPlan = cacheManager.loadPlan(plan.id);
                  if (cachedPlan) {
                    onLoadPlan(cachedPlan);
                  }
                }}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
