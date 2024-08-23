import RestfullClient from '@/components/restfullClient/restfullClient';
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
