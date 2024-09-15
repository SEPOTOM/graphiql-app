'use client';

import { createContext } from 'react';

export interface LanguageContextProps {
  lng: string;
  setLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
