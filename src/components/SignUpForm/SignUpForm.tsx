'use client';

import { Box, Button, TextField, Typography } from '@mui/material';

const SignUpForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField label="Username" name="username" required />
      <TextField label="Email" name="email" type="email" required />
      <TextField label="Password" name="password" type="password" required />
      <TextField label="Confirm Password" name="confirmPassword" type="password" required />
      <Button variant="contained" color="primary" type="submit">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
