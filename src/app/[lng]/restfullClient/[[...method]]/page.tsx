import { PrivateRoute, RestfullClient } from '@/components';
import { Container } from '@mui/material';

const RestfullClientPage = () => {
  return (
    <PrivateRoute>
      <Container sx={{ flexGrow: '1', paddingBottom: '40px' }}>
        <RestfullClient />
      </Container>
    </PrivateRoute>
  );
};

export default RestfullClientPage;
