'use client';

import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

import { useLanguage, useTranslation } from '@/hooks';

const ErrorPage = () => {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexGrow: 1,
      }}
    >
      <Box mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          {t('error_page.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('error_page.text')}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" LinkComponent={Link} href="/">
        {t('error_page.link')}
      </Button>
    </Container>
  );
};

export default ErrorPage;
