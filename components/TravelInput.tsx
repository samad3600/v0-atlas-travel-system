'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const INTERESTS = [
  'Adventure',
  'Culture',
  'Food',
  'Relaxation',
  'Nature',
  'History',
  'Shopping',
  'Nightlife',
];

interface TravelFormProps {
  onSubmit: (data: {
    destination: string;
    budget: number;
    duration: number;
    interests: string[];
  }) => void;
  isLoading?: boolean;
}

export function TravelInput({ onSubmit, isLoading }: TravelFormProps) {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !budget || !duration || interests.length === 0) {
      alert('Please fill in all fields and select at least one interest');
      return;
    }

    onSubmit({
      destination,
      budget: parseInt(budget),
      duration: parseInt(duration),
      interests,
    });
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border/80 transition-all duration-300 shadow-lg hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
          <Label htmlFor="destination" className="text-foreground font-semibold">
            Where do you want to go?
          </Label>
          <Input
            id="destination"
            placeholder="e.g., Tokyo, Paris, Bali"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={isLoading}
            className="border-border bg-input text-foreground placeholder:text-muted-foreground transition-all focus:ring-primary/50 focus:shadow-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500 delay-100">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-foreground font-semibold">
              Budget (USD)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g., 2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={isLoading}
              className="border-border bg-input text-foreground placeholder:text-muted-foreground transition-all focus:ring-primary/50 focus:shadow-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-foreground font-semibold">
              Duration (days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="e.g., 7"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isLoading}
              className="border-border bg-input text-foreground placeholder:text-muted-foreground transition-all focus:ring-primary/50 focus:shadow-lg"
            />
          </div>
        </div>

        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500 delay-200">
          <Label className="text-foreground font-semibold">What interests you?</Label>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map((interest, idx) => (
              <div key={interest} className={`flex items-center space-x-2 animate-in fade-in duration-300`} style={{ animationDelay: `${50 + idx * 20}ms` }}>
                <Checkbox
                  id={interest}
                  checked={interests.includes(interest)}
                  onCheckedChange={() => handleInterestChange(interest)}
                  disabled={isLoading}
                  className="border-border transition-all hover:border-primary/50"
                />
                <Label
                  htmlFor={interest}
                  className="text-sm text-foreground cursor-pointer font-normal hover:text-primary/80 transition-colors"
                >
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-top-2 duration-500 delay-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Planning your trip...
            </span>
          ) : (
            'Plan My Trip'
          )}
        </Button>
      </form>
    </Card>
  );
}
