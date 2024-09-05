'use client';

import Link from 'next/link';
import { AppBar, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';

import AuthButtons from './AuthButtons';

const Header = () => {
  const isSticky = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        transition: 'all 0.3s ease 0s',
        backgroundColor: isSticky ? 'primary.main' : 'transparent',
        height: isSticky ? 64 : 80,
      }}
    >
      <Container>
        <Toolbar>
          <Typography variant="h5">
            <Link href="/">GraphiQL</Link>
          </Typography>
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
