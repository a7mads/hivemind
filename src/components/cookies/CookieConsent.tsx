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

// Export only hasCookieConsent, remove useCookieConsent export
export { hasCookieConsent } from '@/utils/cookies'; 