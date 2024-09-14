'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button, List, ListItem, Typography } from '@mui/material';

import { useAuth } from '@/contexts';
import { useLanguage, useTranslation } from '@/hooks';

import { LinkMetadata } from './types';
import { privateLinks, publicLinks } from './consts';

const AuthBanner = () => {
  const { user } = useAuth();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  const createLink = ({ titleTKey, href, variant }: LinkMetadata): ReactNode => {
    return (
      <ListItem sx={{ width: user ? '100%' : 'auto' }} key={href}>
        <Button
          variant={variant ?? 'contained'}
          color="primary"
          component={Link}
          href={`/${lng}${href}`}
          size="large"
          fullWidth={Boolean(user)}
        >
          {t(`auth_banner.${titleTKey}`)}
        </Button>
      </ListItem>
    );
  };

  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        {user ? `${t('auth_banner.auth_title')}, ${user.displayName}` : t('auth_banner.title')}!
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
