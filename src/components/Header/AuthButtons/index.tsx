'use client';

import Link from 'next/link';
import { Box, Button, SxProps } from '@mui/material';

import { useAuth } from '@/contexts';

const AuthButtons = () => {
  const { status, signOut } = useAuth();

  const isLoading = status === 'loading' || status === 'init';

  return (
    <Box>
      {status === 'authenticated' ?
        <Button onClick={signOut} disabled={isLoading} variant="contained">
          Sign Out
        </Button>
      : <>
          <Button component={Link} href="/sign-in" disabled={isLoading} variant="outlined" sx={{ mr: 1 }}>
            Sign In
          </Button>
          <Button component={Link} href="/sign-up" disabled={isLoading} variant="contained">
            Sign Up
          </Button>
        </>
      }
    </Box>
  );
};

export default AuthButtons;
