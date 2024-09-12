'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts';
import { useLanguage, useTranslation } from '@/hooks';
import { StateMessage } from '@/components';

import { PublicRouteProps } from './types';

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useAuth();
  const router = useRouter();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  if (status === 'authenticated') {
    router.replace('/');
    return <StateMessage>{t('route_states.redirect')}</StateMessage>;
  }

  if (status === 'unauthenticated') {
    return children;
  }

  return <StateMessage showLoading>{t('route_states.loading')}</StateMessage>;
};

export default PublicRoute;
