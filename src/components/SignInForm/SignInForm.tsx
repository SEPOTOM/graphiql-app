'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts';
import { Notification, PasswordField } from '@/components';

import { SignInFormData } from './types';

const SignInForm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleSubmit, register } = useForm<SignInFormData>();
  const { signIn, status } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    await signIn(email, password);

    setIsSuccess(true);
  };

  const isSending = status === 'loading';
  const inputSize = isSmallScreen ? 'small' : 'medium';

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography variant={isSmallScreen ? 'h3' : 'h2'} component="h1" gutterBottom>
          Sign In
        </Typography>

        <TextField label="Email" {...register('email')} required size={inputSize} disabled={isSending} />

        <PasswordField
          label="Password"
          {...register('password')}
          required
          lng="en"
          size={inputSize}
          disabled={isSending}
        />

        <Button variant="contained" color="primary" type="submit" disabled={isSending}>
          Sign In
        </Button>
      </Box>

      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        Successfully signed in
      </Notification>
    </>
  );
};

export default SignInForm;
