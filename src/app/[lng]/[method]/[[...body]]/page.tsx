import { PrivateRoute, RestfullClient } from '@/components';
import { Method } from '@/types';
import { Container } from '@mui/material';
import { notFound } from 'next/navigation';

interface RestfullClientPageProps {
  params: { method: string };
}

const RestfullClientPage = ({ params }: RestfullClientPageProps) => {
  const { method } = params;
  const methods = Object.values(Method) as string[];

  if (!methods.includes(method)) {
    notFound();
  }
  return (
    <PrivateRoute>
      <Container sx={{ flexGrow: '1', paddingBottom: '40px' }}>
        <RestfullClient />
      </Container>
    </PrivateRoute>
  );
};

export default RestfullClientPage;
