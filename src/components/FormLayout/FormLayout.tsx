'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { FormLayoutProps } from './types';

const FormLayout = ({ children, onSubmit, title }: FormLayoutProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Typography variant={isSmallScreen ? 'h3' : 'h2'} component="h1" gutterBottom>
        {title}
      </Typography>

      {children}
    </Box>
  );
};

export default FormLayout;
