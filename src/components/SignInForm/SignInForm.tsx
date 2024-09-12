'use client';

import { useState } from 'react';
import { Button, FormHelperTextProps, TextField, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '@/contexts';
import { useTranslation } from '@/hooks';
import { FormLayout, Notification, PasswordField } from '@/components';
import { signInSchema } from '@/utils';
import { SignInFormData } from '@/types';

import { SignInFormProps } from './types';

const SignInForm = ({ lng }: SignInFormProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });
  const { signIn } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation(lng);
  const { t: vt } = useTranslation(lng, 'validation');

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    await signIn(email, password);

    setIsSuccess(true);
  };

  const inputSize = isSmallScreen ? 'small' : 'medium';
  const helperTextProps: Partial<FormHelperTextProps> = {
    sx: { fontSize: 14 },
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit(onSubmit)} title={t('sign_in.title')} lng={lng}>
        <TextField
          label={t('sign_in.email')}
          {...register('email')}
          required
          size={inputSize}
          disabled={isSubmitting}
          error={Boolean(errors.email)}
          helperText={errors.email?.message ? vt(errors.email.message) : ' '}
          FormHelperTextProps={helperTextProps}
        />

        <PasswordField
          label={t('sign_in.password')}
          {...register('password')}
          required
          lng={lng}
          size={inputSize}
          disabled={isSubmitting}
          error={Boolean(errors.password)}
          helperText={errors.password?.message ? vt(errors.password.message) : ' '}
          FormHelperTextProps={helperTextProps}
        />

        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || !isValid}>
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
