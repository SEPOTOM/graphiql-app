import Link from 'next/link';
import { Box, Button, Container, Typography, List, ListItem } from '@mui/material';

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
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome!
        </Typography>

        <List
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <ListItem sx={{ width: 'auto' }}>
            <Button variant="contained" color="primary" component={Link} href="/sign-in" size="large">
              Sign In
            </Button>
          </ListItem>

          <ListItem sx={{ width: 'auto' }}>
            <Button variant="outlined" color="primary" component={Link} href="/sign-up" size="large">
              Sign Up
            </Button>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default MainPage;
