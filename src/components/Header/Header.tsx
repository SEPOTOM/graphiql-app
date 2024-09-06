'use client';

import Link from 'next/link';
import { AppBar, Container, SxProps, Toolbar, Typography, useScrollTrigger } from '@mui/material';

import AuthButtons from './AuthButtons';
import LngSelect from './LngSelect';
import { HeaderProps } from './types';

const Header = ({ lng }: HeaderProps) => {
  const isSticky = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const headerSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    height: isSticky ? 64 : 100,
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease 0s',
  };
  const logoSx: SxProps = {
    mr: 'auto',
    textDecoration: 'none',
    color: 'black',
  };

  return (
    <AppBar position="sticky" sx={headerSx}>
      <Container>
        <Toolbar>
          <Typography variant="h4" sx={logoSx} component={Link} href="/">
            GraphiQL
          </Typography>
          <LngSelect lng={lng} />
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
