import { Box, Container } from '@mui/material';

import { PublicRoute, SignInForm } from '@/components';
import { LngParam } from '@/types';

const SignInPage = ({ params }: { params: LngParam }) => {
  const { lng } = params;

  return (
    <PublicRoute>
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <Container>
          <SignInForm lng={lng} />
        </Container>
      </Box>
    </PublicRoute>
  );
};

export default SignInPage;
