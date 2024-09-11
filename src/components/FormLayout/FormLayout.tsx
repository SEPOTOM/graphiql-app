'use client';

import { FormEvent, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FirebaseError } from 'firebase/app';

import { Notification } from '@/components';
import { AuthError, getAuthErrorMessage } from '@/utils';

import { FormLayoutProps } from './types';

const FormLayout = ({ children, onSubmit, title }: FormLayoutProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      await onSubmit(e);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setErrorMessage(getAuthErrorMessage(err.code));
      }

      if (err instanceof AuthError) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Typography variant={isSmallScreen ? 'h3' : 'h2'} component="h1" gutterBottom>
        {title}
      </Typography>

      {children}

      <Notification open={Boolean(errorMessage)} onClose={() => setErrorMessage(null)} isError autoHideDuration={5000}>
        {errorMessage}
      </Notification>
    </Box>
  );
};

export default FormLayout;
