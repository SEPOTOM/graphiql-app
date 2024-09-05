import { RestfullClient } from '@/components';
import { LngParam } from '@/types';
import { Container } from '@mui/material';

const RestfullClientPage = () => {
  return (
    <Container sx={{ flexGrow: '1' }}>
      <RestfullClient />
    </Container>
  );
};

export default RestfullClientPage;
