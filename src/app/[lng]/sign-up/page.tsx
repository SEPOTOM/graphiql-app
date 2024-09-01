import { Box, Container } from '@mui/material';

import { SignUpForm } from '@/components';

const SignUpPage = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <SignUpForm />
      </Box>
    </Container>
  );
};

export default SignUpPage;
