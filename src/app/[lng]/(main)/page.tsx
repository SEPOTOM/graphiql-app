import { Box, Container } from '@mui/material';
import { AuthBanner } from '@/components';

const MainPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <AuthBanner />
      </Container>
    </Box>
  );
};

export default MainPage;
