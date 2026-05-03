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
    <Card className="p-6 bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-foreground font-semibold">
            Where do you want to go?
          </Label>
          <Input
            id="destination"
            placeholder="e.g., Tokyo, Paris, Bali"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={isLoading}
            className="border-border bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              className="border-border bg-input text-foreground placeholder:text-muted-foreground"
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
              className="border-border bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-foreground font-semibold">What interests you?</Label>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={interests.includes(interest)}
                  onCheckedChange={() => handleInterestChange(interest)}
                  disabled={isLoading}
                  className="border-border"
                />
                <Label
                  htmlFor={interest}
                  className="text-sm text-foreground cursor-pointer font-normal"
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
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
        >
          {isLoading ? 'Planning your trip...' : 'Plan My Trip'}
        </Button>
      </form>
    </Card>
  );
}
