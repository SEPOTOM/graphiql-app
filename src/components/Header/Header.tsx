'use client';

import Link from 'next/link';
import { AppBar, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';

import AuthButtons from './AuthButtons';
import LngSelect from './LngSelect';
import { HeaderProps } from './types';

const Header = ({ lng }: HeaderProps) => {
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
          <LngSelect lng={lng} />
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
