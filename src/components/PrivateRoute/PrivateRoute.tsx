'use client';

import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useAuth } from '@/contexts';

import { PrivateRouteProps } from './types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, status } = useAuth();
  const router = useRouter();

  if (status === 'init') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <CircularProgress />
        <Typography variant="h4" component="p" ml={2}>
          Authentication in progress...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    router.replace('/');

    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <Typography variant="h4" component="p">
          Redirecting to homepage...
        </Typography>
      </Box>
    );
  }

  return children;
};

export default PrivateRoute;
