'use client';

import { RequestBodyEditor } from '@/components';
import { useTranslation } from '@/hooks';
import { BodyType, SegmentIndex } from '@/types';
import { fallbackLng } from '@/utils';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tabSize } from './consts';

export interface ResponseSectionProps {
  responseBody: string;
  responseCode: number;
  responseStatus: string;
}

export default function ResponseSection({ responseBody, responseCode, responseStatus }: ResponseSectionProps) {
  const pathname = usePathname();
  const lng = pathname.split('/').at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const [formattedJson, setFormattedJson] = useState<string>('');

  useEffect(() => {
    try {
      const parsedJson = JSON.parse(responseBody);
      setFormattedJson(JSON.stringify(parsedJson, null, tabSize));
    } catch {
      setFormattedJson(responseBody);
    }
  }, [responseBody]);

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2} paddingTop={4}>
      <Typography variant="h4">{t('response_header')}</Typography>
      <Typography variant="h6">
        {t('http_response')}: {responseCode} {responseStatus}
      </Typography>
      <RequestBodyEditor
        mode={BodyType.json}
        options={{
          readOnly: true,
          automaticLayout: true,
          minimap: { enabled: false },
        }}
        initialValue={formattedJson}
      />
    </Box>
  );
}
