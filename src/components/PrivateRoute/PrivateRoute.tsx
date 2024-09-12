'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts';
import { useLanguage, useTranslation } from '@/hooks';
import { StateMessage } from '@/components';

import { PrivateRouteProps } from './types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, status } = useAuth();
  const router = useRouter();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  if (status === 'init') {
    return <StateMessage showLoading>{t('route_states.authentication')}</StateMessage>;
  }

  if (!user) {
    router.replace('/');

    return <StateMessage>{t('route_states.redirect')}</StateMessage>;
  }

  return children;
};

export default PrivateRoute;
