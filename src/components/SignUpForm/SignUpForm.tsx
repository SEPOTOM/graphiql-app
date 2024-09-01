'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

import { SignUpData } from '@/components/SignUpForm/types';
import { useAuth } from '@/contexts';

const SignUpForm = () => {
  const { signUp } = useAuth();
  const { handleSubmit, register } = useForm<SignUpData>();

  const onSubmit: SubmitHandler<SignUpData> = async ({ username, email, password }) => {
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
