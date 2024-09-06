import { Box, Container } from '@mui/material';

import { SignUpForm } from '@/components';
import { LngParam } from '@/types';

const SignUpPage = ({ params }: { params: LngParam }) => {
  const { lng } = params;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Container>
        <SignUpForm lng={lng} />
      </Container>
    </Box>
  );
};

export default SignUpPage;
