'use client';

import { MouseEvent, useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import AuthButtons from './AuthButtons';
import LngSelect from './LngSelect';
import { HeaderProps } from './types';

const Header = ({ lng }: HeaderProps) => {
  const isSticky = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const staticHeight = isMediumScreen ? 80 : 100;
  const headerSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    height: isSticky ? 64 : staticHeight,
    backgroundColor: 'white',
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
        <Toolbar disableGutters>
          <Typography variant={isMediumScreen ? 'h5' : 'h4'} sx={logoSx} component={Link} href={`/${lng}`}>
            GraphiQL
          </Typography>

          {isSmallScreen ?
            <IconButton edge="end" onClick={handleMenuOpen} sx={{ color: 'black' }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          : <>
              <LngSelect lng={lng} />
              <AuthButtons lng={lng} />
            </>
          }

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <LngSelect lng={lng} />
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <AuthButtons lng={lng} />
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
