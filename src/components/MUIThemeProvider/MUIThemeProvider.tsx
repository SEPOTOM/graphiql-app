'use client';

import { useEffect, useMemo, useState } from 'react';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

import { useTranslation } from '@/hooks';

import { fallbackLng } from '@/utils';

import { Languages } from '@/types';
import { MUIThemeProviderProps } from '@/components/MUIThemeProvider/types';

type SupportedLocales = keyof typeof locales;

const MUILocalesMap: Record<Languages, SupportedLocales> = {
  en: 'enUS',
  ru: 'ruRU',
};

const MUIThemeProvider = ({ children, lng }: MUIThemeProviderProps) => {
  const [locale, setLocale] = useState<SupportedLocales>(MUILocalesMap[fallbackLng]);
  const { i18n } = useTranslation(lng);

  useEffect(() => {
    setLocale(MUILocalesMap[i18n.language]);
  }, [i18n.language]);

  const theme = useTheme();

  const themeWithLocale = useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);

  return <ThemeProvider theme={themeWithLocale}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
