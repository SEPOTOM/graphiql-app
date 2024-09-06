'use client';

import Link from 'next/link';
import { Box, Button } from '@mui/material';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';

import { AuthButtonsProps } from './types';

const AuthButtons = ({ lng }: AuthButtonsProps) => {
  const { status, signOut } = useAuth();
  const { t } = useTranslation(lng);

  const isLoading = status === 'loading' || status === 'init';

  return (
    <Box>
      {status === 'authenticated' ?
        <Button onClick={signOut} disabled={isLoading} variant="contained">
          {t('header.sign_out_btn')}
        </Button>
      : <>
          <Button component={Link} href="/sign-in" disabled={isLoading} variant="outlined" sx={{ mr: 1 }}>
            {t('header.sign_in_btn')}
          </Button>
          <Button component={Link} href="/sign-up" disabled={isLoading} variant="contained">
            {t('header.sign_up_btn')}
          </Button>
        </>
      }
    </Box>
  );
};

export default AuthButtons;
