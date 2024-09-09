'use client';

import { Box, Typography } from '@mui/material';
import { GraphQlRequestBodyEditor } from '@/components';
import { BodyType, SegmentIndex } from '@/types';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';
import { decodeFromBase64 } from '@/services';

export default function GraphQlRequestBody() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const pathNameFromUrl = pathSegments.at(4);
  let encodedPathNameFromUrl = '';
  if (pathNameFromUrl) {
    encodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2} paddingTop={4}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="h4">{t('request_header')}</Typography>
      </Box>
      <GraphQlRequestBodyEditor mode={BodyType.graphql} options={{ readOnly: false }} />
    </Box>
  );
}
