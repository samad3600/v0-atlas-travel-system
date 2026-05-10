'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check current status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 left-4 animate-in fade-in slide-in-from-left duration-300">
      <Badge
        variant="secondary"
        className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
        Offline Mode
      </Badge>
    </div>
  );
}
