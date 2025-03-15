'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { CookieCategory } from '@/types/cookies';
import { useCookieConsent } from './CookieConsentContext';

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
  const { consent } = useCookieConsent();
  const [hasConsent, setHasConsent] = useState(false);

  // Check for consent whenever the consent state changes
  useEffect(() => {
    // If no consent given yet, only necessary cookies are allowed
    if (!consent.consentGiven) {
      setHasConsent(category === 'necessary');
    } else {
      setHasConsent(consent[category]);
    }
  }, [consent, category]);

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