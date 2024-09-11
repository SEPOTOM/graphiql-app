import { getTranslation } from '@/utils/i18n';
import { defaultNS, fallbackLng, getI18nOptions, i18nCookieName, languages } from '@/utils/i18n/settings';
import {
  graphQLSchemaQuery,
  headersGraphQLSchema,
  variablesGraphQLSchema,
  basicRequestErrorMessage,
} from './constants';
import { isImagePath } from '@/utils/pathname';
import { signInSchema, signUpSchema } from '@/utils/validation';
import { AuthError, getAuthErrorMessage } from '@/utils/errors';

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
  variablesGraphQLSchema,
  basicRequestErrorMessage,
  signInSchema,
  signUpSchema,
  getAuthErrorMessage,
  AuthError,
};
