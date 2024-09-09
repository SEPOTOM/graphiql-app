'use client';

import { ReactNode, useState } from 'react';
import { LanguageContext } from './LanguageContext';

interface LanguageProviderProps {
  lang: string;
  children: ReactNode;
}

export default function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const [lng, setLng] = useState<string>(lang);

  const setLanguage = (language: string) => {
    setLng(language);
  };

  return <LanguageContext.Provider value={{ lng, setLanguage }}>{children}</LanguageContext.Provider>;
}
