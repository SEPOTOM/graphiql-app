'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { FormLayout, Notification, PasswordField } from '@/components';

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
      <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('sign_up.title')}>
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
      </FormLayout>

      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        {t('sign_up.success_msg')}
      </Notification>
    </>
  );
};

export default SignUpForm;
