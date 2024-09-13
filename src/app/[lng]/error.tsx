'use client';

import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

const ErrorPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexGrow: 1,
      }}
    >
      <Box mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please try again later.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" LinkComponent={Link} href="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
