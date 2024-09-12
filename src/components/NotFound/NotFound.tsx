'use client';

import { useLanguage, useTranslation } from '@/hooks';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  return (
    <Box display="flex" flexGrow="1" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">{t('not_found_main_heading')}</Typography>
        <Typography variant="h6">{t('not_found_sub_heading')}</Typography>
      </Box>
      <Button variant="outlined" component={Link} href="/">
        {t('not_found_button')}
      </Button>
    </Box>
  );
}
