'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button, List, ListItem, Typography } from '@mui/material';

import { useAuth } from '@/contexts';

import { LinkMetadata } from './types';
import { privateLinks, publicLinks } from './consts';

const AuthBanner = () => {
  const { user } = useAuth();

  const createLink = ({ title, href, variant }: LinkMetadata): ReactNode => {
    return (
      <ListItem sx={{ width: user ? '100%' : 'auto' }} key={href}>
        <Button
          variant={variant ?? 'contained'}
          color="primary"
          component={Link}
          href={href}
          size="large"
          fullWidth={Boolean(user)}
        >
          {title}
        </Button>
      </ListItem>
    );
  };

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
        {user ? privateLinks.map(createLink) : publicLinks.map(createLink)}
      </List>
    </>
  );
};

export default AuthBanner;
