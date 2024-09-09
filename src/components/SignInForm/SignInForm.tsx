'use client';

import { useState } from 'react';
import { Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { FormLayout, Notification, PasswordField } from '@/components';

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
      <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('sign_in.title')}>
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
      </FormLayout>

      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        {t('sign_in.success_msg')}
      </Notification>
    </>
  );
};

export default SignInForm;
