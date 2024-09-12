import Link from 'next/link';
import { Button, List, ListItem, Typography } from '@mui/material';

const AuthBanner = () => {
  return (
    <>
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
    </>
  );
};

export default AuthBanner;
