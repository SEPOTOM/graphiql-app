import { Box, Container } from '@mui/material';

import { SignInForm } from '@/components';
import { LngParam } from '@/types';

const SignInPage = ({ params }: { params: LngParam }) => {
  const { lng } = params;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Container>
        <SignInForm lng={lng} />
      </Container>
    </Box>
  );
};

export default SignInPage;
