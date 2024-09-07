'use client';

import { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { RequestBodyEditor } from '@/components';
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
    <Box display={'flex'} flexDirection={'column'} gap={1} width="100%">
      <RequestBodyEditor mode={BodyType.graphql} options={{ readOnly: false }} />
    </Box>
  );
}
