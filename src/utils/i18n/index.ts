import { KeyPrefix, Namespace, createInstance, i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { UseTranslationOptions } from 'react-i18next';

import { defaultNS, getI18nOptions } from '@/utils/i18n/settings';

const initI18next = async (lng: string, ns: string): Promise<i18n> => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getI18nOptions(lng, ns));

  return i18nInstance;
};

export const getTranslation = async (
  lng: string,
  ns?: string | string[],
  options: UseTranslationOptions<KeyPrefix<Namespace>> = {}
) => {
  let namespace = Array.isArray(ns) ? ns[0] : ns;

  if (!namespace) {
    namespace = defaultNS;
  }

  const i18nextInstance = await initI18next(lng, namespace);

  return {
    t: i18nextInstance.getFixedT(lng, namespace, options.keyPrefix),
    i18n: i18nextInstance,
  };
};
