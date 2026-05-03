'use client';

import { useState, useEffect } from 'react';
import { TravelInput } from '@/components/TravelInput';
import { PlanGenerator } from '@/components/PlanGenerator';
import { PlanResults } from '@/components/PlanResults';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { OfflinePlans } from '@/components/OfflinePlans';
import { Header } from '@/components/Header';
import { cacheManager } from '@/app/lib/cache';
import { TravelPlanInput, CachedPlan } from '@/app/lib/agents/types';

interface AgentStep {
  agent: string;
  thinking: string;
  response?: string;
  isComplete?: boolean;
}

export default function Home() {
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [fullPlan, setFullPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showOfflinePlans, setShowOfflinePlans] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLoadPlan = (plan: CachedPlan) => {
    setFullPlan(plan.generatedPlan);
    setAgentSteps([]);
    setShowResults(true);
    setError('');
    setShowOfflinePlans(false);
  };

  const handleGeneratePlan = async (input: TravelPlanInput) => {
    if (isOffline) {
      setError('You are offline. Please check available cached plans or go online to generate a new one.');
      setShowOfflinePlans(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setAgentSteps([]);
    setFullPlan('');
    setShowResults(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const data = JSON.parse(line);

            if (data.type === 'agent_start') {
              setAgentSteps((prev) => [
                ...prev,
                {
                  agent: data.agent,
                  thinking: data.thinking,
                  response: undefined,
                  isComplete: false,
                },
              ]);
            } else if (data.type === 'agent_complete') {
              setAgentSteps((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;
                if (lastIndex >= 0) {
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    response: data.response,
                    isComplete: true,
                  };
                }
                return updated;
              });
            } else if (data.type === 'complete') {
              setFullPlan(data.fullPlan);
              // Cache the plan
              cacheManager.savePlan(input, data.fullPlan);
            } else if (data.type === 'error') {
              setError(data.message);
            }
          } catch (e) {
            console.error('[v0] Error parsing stream:', e);
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('[v0] Error generating plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPlan = () => {
    navigator.clipboard.writeText(fullPlan);
    alert('Plan copied to clipboard!');
  };

  const handleClearCache = () => {
    if (confirm('Clear all cached plans?')) {
      cacheManager.clearCache();
      setFullPlan('');
      setAgentSteps([]);
      setShowResults(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Input Form */}
        <TravelInput onSubmit={handleGeneratePlan} isLoading={isLoading || isOffline} />

        {/* Offline Plans */}
        <OfflinePlans
          isVisible={showOfflinePlans}
          onLoadPlan={handleLoadPlan}
        />

        {/* Plan Generator Stream */}
        <PlanGenerator
          isVisible={showResults && !fullPlan}
          agentSteps={agentSteps}
          error={error}
        />

        {/* Plan Results */}
        <PlanResults
          plan={fullPlan}
          isVisible={fullPlan.length > 0}
          onCopy={handleCopyPlan}
          onClearCache={handleClearCache}
        />
      </div>

      {/* Offline Indicator */}
      <OfflineIndicator />
    </main>
  );
}
