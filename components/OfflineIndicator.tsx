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
    <Badge
      variant="secondary"
      className="fixed bottom-4 left-4 bg-accent text-accent-foreground px-3 py-1"
    >
      Offline Mode
    </Badge>
  );
}
