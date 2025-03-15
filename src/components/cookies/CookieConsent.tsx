'use client';

import React from 'react';
import { CookieConsentProvider } from './CookieConsentContext';
import { CookieBanner } from './CookieBanner';
import { CookiePreferences } from './CookiePreferences';

export const CookieConsent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <CookieConsentProvider>
      {children}
      <CookieBanner />
      <CookiePreferences />
    </CookieConsentProvider>
  );
};

// Export a hook to manage cookie consent in other components
export { useCookieConsent } from './CookieConsentContext';
export { hasCookieConsent } from '@/utils/cookies'; 