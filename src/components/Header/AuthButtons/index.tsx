'use client';

import Link from 'next/link';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';

import { AuthButtonsProps } from './types';

const AuthButtons = ({ lng }: AuthButtonsProps) => {
  const { status, signOut } = useAuth();
  const { t } = useTranslation(lng);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoading = status === 'loading' || status === 'init';
  const isAuthenticated = status === 'authenticated';

  return (
    <Box sx={{ width: isAuthenticated && isSmallScreen ? '100%' : 'auto' }}>
      {isAuthenticated ?
        <Button onClick={signOut} disabled={isLoading} variant="contained" fullWidth>
          {t('header.sign_out_btn')}
        </Button>
      : <>
          <Button component={Link} href={`/${lng}/sign-in`} disabled={isLoading} variant="outlined" sx={{ mr: 1 }}>
            {t('header.sign_in_btn')}
          </Button>
          <Button component={Link} href={`/${lng}/sign-up`} disabled={isLoading} variant="contained">
            {t('header.sign_up_btn')}
          </Button>
        </>
      }
    </Box>
  );
};

export default AuthButtons;
