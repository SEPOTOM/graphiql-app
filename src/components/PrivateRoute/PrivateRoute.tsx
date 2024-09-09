'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts';

import { PrivateRouteProps } from './types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, status } = useAuth();
  const router = useRouter();

  if (status === 'init') {
    return;
  }

  if (!user) {
    router.replace('/');
    return;
  }

  return children;
};

export default PrivateRoute;
