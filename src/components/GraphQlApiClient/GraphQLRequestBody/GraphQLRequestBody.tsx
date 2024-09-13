'use client';

import { Box, Typography } from '@mui/material';
import { GraphQlRequestBodyEditor } from '@/components';
import { BodyType } from '@/types';
import { useLanguage, useTranslation } from '@/hooks';

export default function GraphQlRequestBody() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
      paddingTop={4}
      minHeight="35svh"
    >
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="h4">{t('request_header')}</Typography>
      </Box>
      <GraphQlRequestBodyEditor mode={BodyType.graphql} options={{ readOnly: false }} />
    </Box>
  );
}
