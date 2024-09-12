'use client';

import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useAuth } from '@/contexts';

import { PublicRouteProps } from './types';

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useAuth();
  const router = useRouter();

  if (status === 'authenticated') {
    router.replace('/');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <Typography variant="h4" component="p">
          Redirecting to the main page...
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
        Loading...
      </Typography>
    </Box>
  );
};

export default PublicRoute;
