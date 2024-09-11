'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormHelperTextProps, TextField, useMediaQuery, useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { FormLayout, Notification, PasswordField } from '@/components';
import { signUpSchema } from '@/utils';
import { SignUpFormData } from '@/types';

import { SignUpFormProps } from './types';

const SignUpForm = ({ lng }: SignUpFormProps) => {
  const { signUp, status } = useAuth();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });
  const { t } = useTranslation(lng);
  const { t: vt } = useTranslation(lng, 'validation');
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

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatchError = password !== confirmPassword ? vt('confirm_pwd.match') : '';
  const confirmPasswordError =
    errors.confirmPassword?.message ? vt(errors.confirmPassword.message) : passwordsMatchError;

  const isSending = status === 'loading';
  const inputSize = isSmallScreen ? 'small' : 'medium';
  const helperTextProps: Partial<FormHelperTextProps> = {
    sx: { fontSize: 14 },
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('sign_up.title')}>
        <TextField
          label={t('sign_up.username')}
          {...register('username')}
          disabled={isSending}
          required
          size={inputSize}
          error={Boolean(errors.username)}
          helperText={errors.username?.message ? vt(errors.username.message) : ' '}
          FormHelperTextProps={helperTextProps}
        />

        <TextField
          label={t('sign_up.email')}
          {...register('email')}
          type="email"
          disabled={isSending}
          required
          size={inputSize}
          error={Boolean(errors.email)}
          helperText={errors.email?.message ? vt(errors.email.message) : ' '}
          FormHelperTextProps={helperTextProps}
        />

        <PasswordField
          label={t('sign_up.password')}
          {...register('password')}
          disabled={isSending}
          required
          lng={lng}
          size={inputSize}
          error={Boolean(errors.password)}
          helperText={errors.password?.message ? vt(errors.password.message) : ' '}
          FormHelperTextProps={helperTextProps}
        />

        <PasswordField
          label={t('sign_up.confirm_password')}
          {...register('confirmPassword')}
          disabled={isSending}
          required
          lng={lng}
          size={inputSize}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError || ' '}
          FormHelperTextProps={helperTextProps}
        />

        <Button variant="contained" color="primary" type="submit" disabled={isSending || !isValid}>
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
