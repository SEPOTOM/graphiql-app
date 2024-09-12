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

  if (status === 'init') {
    return <StateMessage showLoading>{t('route_states.loading')}</StateMessage>;
  }

  if (status === 'authenticated') {
    router.replace('/');

    return <StateMessage>{t('route_states.redirect')}</StateMessage>;
  }

  return children;
};

export default PublicRoute;
