'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CookieConsent, CookieConsentContextType } from '@/types/cookies';
import { getCookieConsent, setCookieConsent, getDefaultConsent } from '@/utils/cookies';

// Create context with default values
const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: getDefaultConsent(),
  updateConsent: () => {},
  acceptAll: () => {},
  rejectNonEssential: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
  preferencesOpen: false,
});

export const useCookieConsent = () => useContext(CookieConsentContext);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [consent, setConsent] = useState<CookieConsent>(getDefaultConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved consent on mount
  useEffect(() => {
    const savedConsent = getCookieConsent();
    setConsent(savedConsent);
    setIsInitialized(true);
  }, []);

  // Save consent whenever it changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      setCookieConsent(consent);
      
      // Dispatch a custom event to notify other components about consent changes
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cookieConsentChanged'));
      }
    }
  }, [consent, isInitialized]);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    setConsent(prev => ({
      ...prev,
      ...newConsent,
      consentGiven: true, // Mark that the user has made a choice
    }));
  };

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    setPreferencesOpen(false);
  };

  const rejectNonEssential = () => {
    updateConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    setPreferencesOpen(false);
  };

  const openPreferences = () => setPreferencesOpen(true);
  const closePreferences = () => setPreferencesOpen(false);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        updateConsent,
        acceptAll,
        rejectNonEssential,
        openPreferences,
        closePreferences,
        preferencesOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}; 