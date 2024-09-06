'use client';

import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PasswordField } from '@/components';

import { SignInFormData } from './types';

const SignInForm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleSubmit, register } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
  };

  const inputSize = isSmallScreen ? 'small' : 'medium';

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Typography variant={isSmallScreen ? 'h3' : 'h2'} component="h1" gutterBottom>
        Sign In
      </Typography>

      <TextField label="Email" {...register('email')} required size={inputSize} />
      <PasswordField label="Password" {...register('password')} required lng="en" size={inputSize} />

      <Button variant="contained" color="primary" type="submit">
        Sign In
      </Button>
    </Box>
  );
};

export default SignInForm;
