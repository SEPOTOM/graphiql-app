'use client';

import { Box, Typography } from '@mui/material';
import { GraphQlRequestBodyEditor } from '@/components';
import { BodyType, SegmentIndex } from '@/types';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';

export default function GraphQlRequestBody() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
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
