import { HistorySection, PrivateRoute } from '@/components';
import { Container } from '@mui/material';

export default function HistoryPage() {
  return (
    <PrivateRoute>
      <Container sx={{ flexGrow: '1', paddingBottom: '40px' }}>
        <HistorySection />
      </Container>
    </PrivateRoute>
  );
}
