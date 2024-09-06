import { Box, Container } from '@mui/material';

import { SignInForm } from '@/components';

const SignInPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Container>
        <SignInForm />
      </Container>
    </Box>
  );
};

export default SignInPage;
