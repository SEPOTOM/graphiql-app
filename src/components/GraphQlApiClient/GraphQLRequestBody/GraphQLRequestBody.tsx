'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { GraphQLRequestBodyEditor } from '@/components';
import { BodyMode, BodyType, SegmentIndex } from '@/types';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';

export default function GraphQlRequestBody() {
  const [bodyMode, setBodyMode] = useState<string>(BodyMode.None);
  const [bodyType, setBodyType] = useState<string>(BodyType.json);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);

  useEffect(() => {
    const segmentsCount = pathSegments.length;
    if (bodyMode === BodyMode.None && segmentsCount >= SegmentIndex.LastElement) {
      const newSegments = pathSegments.slice(0, SegmentIndex.Body);
      window.history.replaceState(null, '', newSegments.join('/'));
    }
  }, [bodyMode, pathSegments]);

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2} paddingTop={4}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="h4">{t('request_header')}</Typography>
      </Box>
      <GraphQLRequestBodyEditor mode={BodyType.graphql} options={{ readOnly: false }} />
    </Box>
  );
}
