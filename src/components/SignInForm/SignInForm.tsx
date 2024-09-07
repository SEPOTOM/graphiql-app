'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { Notification, PasswordField } from '@/components';

import { SignInFormData, SignInFormProps } from './types';

const SignInForm = ({ lng }: SignInFormProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleSubmit, register } = useForm<SignInFormData>();
  const { signIn, status } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation(lng);

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
          {t('sign_in.title')}
        </Typography>

        <TextField label={t('sign_in.email')} {...register('email')} required size={inputSize} disabled={isSending} />

        <PasswordField
          label={t('sign_in.password')}
          {...register('password')}
          required
          lng={lng}
          size={inputSize}
          disabled={isSending}
        />

        <Button variant="contained" color="primary" type="submit" disabled={isSending}>
          {t('sign_in.submit_button')}
        </Button>
      </Box>

      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        {t('sign_in.success_msg')}
      </Notification>
    </>
  );
};

export default SignInForm;
