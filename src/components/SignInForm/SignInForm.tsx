'use client';

import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { PasswordField } from '@/components';

const SignInForm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const inputSize = isSmallScreen ? 'small' : 'medium';

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Typography variant={isSmallScreen ? 'h3' : 'h2'} component="h1" gutterBottom>
        Sign In
      </Typography>

      <TextField label="Email" name="email" required size={inputSize} />
      <PasswordField label="Password" name="password" required lng="en" size={inputSize} />

      <Button variant="contained" color="primary" type="submit">
        Sign In
      </Button>
    </Box>
  );
};

export default SignInForm;
