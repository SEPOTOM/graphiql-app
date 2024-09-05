import Link from 'next/link';
import { Box, Button } from '@mui/material';

import { useAuth } from '@/contexts';

const AuthButtons = () => {
  const { status, signOut } = useAuth();

  const isLoading = status === 'loading' || status === 'init';

  return (
    <Box>
      {status === 'authenticated' ?
        <Button onClick={signOut} disabled={isLoading}>
          Sign Out
        </Button>
      : <>
          <Button component={Link} href="/sign-in" sx={{ ml: 2 }} disabled={isLoading}>
            Sign In
          </Button>
          <Button component={Link} href="/sign-up" sx={{ ml: 2 }} disabled={isLoading}>
            Sign Up
          </Button>
        </>
      }
    </Box>
  );
};

export default AuthButtons;
