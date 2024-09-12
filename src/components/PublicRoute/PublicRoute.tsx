'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts';

import { PublicRouteProps } from './types';

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useAuth();
  const router = useRouter();

  if (status === 'authenticated') {
    router.replace('/');
    return;
  }

  if (status === 'unauthenticated') {
    return children;
  }

  return;
};

export default PublicRoute;
