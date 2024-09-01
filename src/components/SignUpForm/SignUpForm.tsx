'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

import { useAuth } from '@/contexts';

import { SignUpFormData } from './types';

const SignUpForm = () => {
  const { signUp } = useAuth();
  const { handleSubmit, register } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async ({ username, email, password }) => {
    await signUp({
      email,
      password,
      displayName: username,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField label="Username" {...register('username')} required />
      <TextField label="Email" {...register('email')} type="email" required />
      <TextField label="Password" {...register('password')} type="password" required />
      <TextField label="Confirm Password" {...register('confirmPassword')} type="password" required />
      <Button variant="contained" color="primary" type="submit">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
