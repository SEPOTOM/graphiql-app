'use client';

import { LanguageContext } from '@/contexts';
import { useContext } from 'react';

export default function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a ThemeProvider');
  }
  return context;
}
