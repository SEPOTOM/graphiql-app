import { HistorySection } from '@/components';
import { Container } from '@mui/material';

export default function HistoryPage() {
  return (
    <Container sx={{ flexGrow: '1', paddingBottom: '40px' }}>
      <HistorySection />
    </Container>
  );
}
