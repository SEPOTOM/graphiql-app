import { Box, Container } from '@mui/material';

import { SignUpForm } from '@/components';
import { LngParam } from '@/types';

const SignUpPage = ({ params }: { params: LngParam }) => {
  const { lng } = params;

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <SignUpForm lng={lng} />
      </Box>
    </Container>
  );
};

export default SignUpPage;
