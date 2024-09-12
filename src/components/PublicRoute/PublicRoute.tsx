'use client';

import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useAuth } from '@/contexts';
import { useLanguage, useTranslation } from '@/hooks';

import { PublicRouteProps } from './types';

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useAuth();
  const router = useRouter();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  if (status === 'authenticated') {
    router.replace('/');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <Typography variant="h4" component="p">
          {t('route_states.redirect')}
        </Typography>
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    return children;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <CircularProgress />
      <Typography variant="h4" component="p" ml={2}>
        {t('route_states.loading')}
      </Typography>
    </Box>
  );
};

export default PublicRoute;
