import { RestfullClient } from '@/components';
import { Container } from '@mui/material';

const RestLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <RestfullClient />
      {children}
    </Container>
  );
};

export default RestLayout;
