import { useLanguage, useTranslation } from '@/hooks';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function EmptyRequestHistory() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <Typography component="p" gutterBottom={true} variant="h4">
        {t('empty_requests_history_message')}
      </Typography>
      <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-evenly', fontSize: 24 }}>
        <Link href="/GET">{t('rest_client')}</Link>
        <Link href="/GRAPHQL">{t('graphql_client')}</Link>
      </Box>
    </Box>
  );
}
