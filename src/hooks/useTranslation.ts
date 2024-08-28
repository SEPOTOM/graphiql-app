'use client';

import { useEffect, useState } from 'react';
import i18next, { KeyPrefix, Namespace } from 'i18next';
import { UseTranslationOptions, initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { getI18nOptions, languages, i18nCookieName } from '@/utils';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`@/utils/i18n/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getI18nOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

const useTranslation = (lng: string, ns?: string, options?: UseTranslationOptions<KeyPrefix<Namespace>>) => {
  const [cookies, setCookie] = useCookies([i18nCookieName]);
  const res = useTranslationOrg(ns, options);
  const { i18n } = res;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (activeLng !== i18n.resolvedLanguage) {
      setActiveLng(i18n.resolvedLanguage);
    }
  }, [activeLng, i18n.resolvedLanguage]);

  useEffect(() => {
    if (lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  useEffect(() => {
    if (cookies.i18next !== lng) {
      setCookie(i18nCookieName, lng, { path: '/' });
    }
  }, [lng, cookies.i18next, setCookie]);

  return res;
};

export default useTranslation;
