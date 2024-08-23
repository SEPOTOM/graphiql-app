import RestfullClient from '@/components/restfulClient/restfullClient';
import { Container, Box } from '@mui/material';

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
