import { CookieConsent } from '@/types/cookies';

const COOKIE_NAME = 'hivemind-cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

export const getDefaultConsent = (): CookieConsent => ({
  necessary: true, // Always true
  functional: false,
  analytics: false,
  marketing: false,
  consentGiven: false,
});

export const getCookieConsent = (): CookieConsent => {
  if (typeof window === 'undefined') {
    return getDefaultConsent();
  }

  try {
    const storedConsent = localStorage.getItem(COOKIE_NAME);
    if (storedConsent) {
      return JSON.parse(storedConsent) as CookieConsent;
    }
  } catch (error) {
    console.error('Error reading cookie consent from localStorage:', error);
  }

  return getDefaultConsent();
};

export const setCookieConsent = (consent: CookieConsent): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Save to localStorage for client-side access
    localStorage.setItem(COOKIE_NAME, JSON.stringify(consent));

    // Also set an actual cookie for server-side access
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
    
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(
      consent
    )}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
};

export const hasCookieConsent = (category: keyof Omit<CookieConsent, 'consentGiven'>): boolean => {
  const consent = getCookieConsent();
  
  if (!consent.consentGiven) {
    // If no consent given yet, only necessary cookies are allowed
    return category === 'necessary';
  }
  
  return consent[category];
};

// Helper function to check if consent has been given
export const hasConsentBeenGiven = (): boolean => {
  return getCookieConsent().consentGiven;
}; 