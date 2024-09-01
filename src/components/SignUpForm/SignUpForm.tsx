'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

import { useAuth } from '@/contexts';
import { Notification, PasswordField } from '@/components';

import { SignUpFormData } from './types';

const SignUpForm = () => {
  const { signUp, status } = useAuth();
  const { handleSubmit, register } = useForm<SignUpFormData>();
  const [isSuccess, setIsSuccess] = useState(false);

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
          Sign Up
        </Typography>
        <TextField label="Username" {...register('username')} disabled={isSending} required />
        <TextField label="Email" {...register('email')} type="email" disabled={isSending} required />
        <PasswordField label="Password" {...register('password')} disabled={isSending} required />
        <PasswordField label="Confirm Password" {...register('confirmPassword')} disabled={isSending} required />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </Box>
      <Notification open={isSuccess} onClose={() => setIsSuccess(false)}>
        Successfully signed up
      </Notification>
    </>
  );
};

export default SignUpForm;
