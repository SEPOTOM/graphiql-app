'use client';

import Link from 'next/link';
import { Button, List, ListItem, Typography } from '@mui/material';

import { useAuth } from '@/contexts';

const AuthBanner = () => {
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome{user ? ` back, ${user.displayName}` : ''}!
      </Typography>

      <List
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {user ?
          <>
            <ListItem>
              <Button variant="contained" color="primary" component={Link} href="/GET" size="large" fullWidth>
                REST Client
              </Button>
            </ListItem>

            <ListItem>
              <Button variant="contained" color="primary" component={Link} href="/GRAPHQL" size="large" fullWidth>
                GraphiQL Client
              </Button>
            </ListItem>

            <ListItem>
              <Button variant="contained" color="primary" component={Link} href="/history" size="large" fullWidth>
                History
              </Button>
            </ListItem>
          </>
        : <>
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
          </>
        }
      </List>
    </>
  );
};

export default AuthBanner;
