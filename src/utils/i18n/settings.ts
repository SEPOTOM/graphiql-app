import { InitOptions } from 'i18next';

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ru'];
export const defaultNS = 'translation';
export const i18nCookieName = 'i18next';

export const getOptions = (lng = fallbackLng, ns = defaultNS): InitOptions => {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
};
