'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { hasCookieConsent } from '@/utils/cookies';
import { CookieCategory } from '@/types/cookies';

interface ConditionalScriptProps {
  src: string;
  category: CookieCategory;
  id?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
}

export const ConditionalScript: React.FC<ConditionalScriptProps> = ({
  src,
  category,
  id,
  strategy = 'afterInteractive',
  onLoad,
}) => {
  const [hasConsent, setHasConsent] = useState(false);

  // Check for consent on mount and whenever localStorage changes
  useEffect(() => {
    // Initial check
    setHasConsent(hasCookieConsent(category));

    // Listen for storage events (when consent changes)
    const handleStorageChange = () => {
      setHasConsent(hasCookieConsent(category));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for our own consent changes
    window.addEventListener('cookieConsentChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentChanged', handleStorageChange);
    };
  }, [category]);

  if (!hasConsent) {
    return null;
  }

  return (
    <Script
      src={src}
      id={id}
      strategy={strategy}
      onLoad={onLoad}
    />
  );
}; 