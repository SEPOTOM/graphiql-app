'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { Notification, PasswordField } from '@/components';

import { SignUpFormData, SignUpFormProps } from './types';

const SignUpForm = ({ lng }: SignUpFormProps) => {
  const { signUp, status } = useAuth();
  const { handleSubmit, register } = useForm<SignUpFormData>();
  const { t } = useTranslation(lng);
  const [isSuccess, setIsSuccess] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit: SubmitHandler<SignUpFormData> = async ({ username, email, password }) => {
    await signUp({
      email,
      password,
      displayName: username,
    });

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
          {t('sign_up.title')}
        </Typography>

        <TextField
          label={t('sign_up.username')}
          {...register('username')}
          disabled={isSending}
          required
          size={inputSize}
        />

        <TextField
          label={t('sign_up.email')}
          {...register('email')}
          type="email"
          disabled={isSending}
          required
          size={inputSize}
        />

        <PasswordField
          label={t('sign_up.password')}
          {...register('password')}
          disabled={isSending}
          required
          lng={lng}
          size={inputSize}
        />

        <PasswordField
          label={t('sign_up.confirm_password')}
          {...register('confirmPassword')}
          disabled={isSending}
          required
          lng={lng}
          size={inputSize}
        />

        <Button variant="contained" color="primary" type="submit" disabled={isSending}>
          {t('sign_up.submit_button')}
        </Button>
      </Box>

      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        {t('sign_up.success_msg')}
      </Notification>
    </>
  );
};

export default SignUpForm;
