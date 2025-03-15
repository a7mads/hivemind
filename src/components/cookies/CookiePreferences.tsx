'use client';

import React from 'react';
import { useCookieConsent } from './CookieConsentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CookieCategory } from '@/types/cookies';

export const CookiePreferences: React.FC = () => {
  const { 
    consent, 
    updateConsent, 
    acceptAll, 
    rejectNonEssential, 
    closePreferences, 
    preferencesOpen 
  } = useCookieConsent();

  if (!preferencesOpen) {
    return null;
  }

  const handleToggle = (category: CookieCategory) => {
    if (category === 'necessary') return; // Can't toggle necessary cookies
    
    updateConsent({
      [category]: !consent[category],
    });
  };

  return (
    <AnimatePresence>
      {preferencesOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={closePreferences}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cookie Preferences</h2>
                  <button 
                    onClick={closePreferences}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Manage your cookie preferences. Necessary cookies are required for the website to function properly.
                </p>
                
                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Necessary Cookies</h3>
                      <div className="relative inline-block w-10 mr-2 align-middle">
                        <input 
                          type="checkbox" 
                          checked={true} 
                          disabled
                          className="peer sr-only"
                        />
                        <div className="w-10 h-5 bg-gray-400 rounded-full peer peer-checked:bg-blue-600"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      These cookies are essential for the website to function properly and cannot be disabled.
                    </p>
                  </div>
                  
                  {/* Functional Cookies */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Functional Cookies</h3>
                      <div className="relative inline-block w-10 mr-2 align-middle">
                        <input 
                          type="checkbox" 
                          id="functional-toggle"
                          checked={consent.functional} 
                          onChange={() => handleToggle('functional')}
                          className="peer sr-only"
                        />
                        <label 
                          htmlFor="functional-toggle" 
                          className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-blue-600 w-10"
                        >
                          <span className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
                        </label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      These cookies enable personalized features and functionality.
                    </p>
                  </div>
                  
                  {/* Analytics Cookies */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h3>
                      <div className="relative inline-block w-10 mr-2 align-middle">
                        <input 
                          type="checkbox" 
                          id="analytics-toggle"
                          checked={consent.analytics} 
                          onChange={() => handleToggle('analytics')}
                          className="peer sr-only"
                        />
                        <label 
                          htmlFor="analytics-toggle" 
                          className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-blue-600 w-10"
                        >
                          <span className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
                        </label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                  </div>
                  
                  {/* Marketing Cookies */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">Marketing Cookies</h3>
                      <div className="relative inline-block w-10 mr-2 align-middle">
                        <input 
                          type="checkbox" 
                          id="marketing-toggle"
                          checked={consent.marketing} 
                          onChange={() => handleToggle('marketing')}
                          className="peer sr-only"
                        />
                        <label 
                          htmlFor="marketing-toggle" 
                          className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-blue-600 w-10"
                        >
                          <span className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
                        </label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <button
                    onClick={rejectNonEssential}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={closePreferences}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-md transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 