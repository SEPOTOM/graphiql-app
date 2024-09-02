'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { Notification, PasswordField } from '@/components';

import { SignUpFormData, SignUpFormProps } from './types';

const SignUpForm = ({ lng }: SignUpFormProps) => {
  const { signUp, status } = useAuth();
  const { handleSubmit, register } = useForm<SignUpFormData>();
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation(lng);

  const onSubmit: SubmitHandler<SignUpFormData> = async ({ username, email, password }) => {
    await signUp({
      email,
      password,
      displayName: username,
    });

    setIsSuccess(true);
  };

  const isSending = status === 'loading';

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {t('signUp.title')}
        </Typography>
        <TextField label={t('signUp.username')} {...register('username')} disabled={isSending} required />
        <TextField label={t('signUp.email')} {...register('email')} type="email" disabled={isSending} required />
        <PasswordField label={t('signUp.password')} {...register('password')} disabled={isSending} required lng={lng} />
        <PasswordField
          label={t('signUp.confirmPassword')}
          {...register('confirmPassword')}
          disabled={isSending}
          required
          lng={lng}
        />
        <Button variant="contained" color="primary" type="submit">
          {t('signUp.submitButton')}
        </Button>
      </Box>
      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        {t('signUp.successMsg')}
      </Notification>
    </>
  );
};

export default SignUpForm;
