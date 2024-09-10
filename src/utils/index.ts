import { getTranslation } from '@/utils/i18n';
import { defaultNS, fallbackLng, getI18nOptions, i18nCookieName, languages } from '@/utils/i18n/settings';
import { graphQLSchemaQuery, headersGraphQLSchema } from './constants';
import { isImagePath } from '@/utils/pathname';
import { signInSchema } from '@/utils/validation';

export {
  fallbackLng,
  languages,
  i18nCookieName,
  defaultNS,
  getTranslation,
  getI18nOptions,
  isImagePath,
  graphQLSchemaQuery,
  headersGraphQLSchema,
  signInSchema,
};
