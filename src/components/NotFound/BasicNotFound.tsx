'use client';

import { useTranslation } from '@/hooks';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

interface BasicNotFoundProps {
  lng: string;
}

export default function BasicNotFound({ lng }: BasicNotFoundProps) {
  const { t } = useTranslation(lng);

  return (
    <Box display="flex" height="100vh" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">{t('basic_not_found_main_heading')}</Typography>
        <Typography variant="h6">{t('basic_not_found_sub_heading')}</Typography>
      </Box>
      <Button variant="outlined" component={Link} href="/">
        {t('not_found_button')}
      </Button>
    </Box>
  );
}
