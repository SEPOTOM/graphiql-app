'use client';

import { RequestBodyEditor } from '@/components';
import { useLanguage, useTranslation } from '@/hooks';
import { BodyType } from '@/types';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface ResponseSectionProps {
  responseBody: string;
  responseCode: number;
  responseStatus: string;
}

export default function ResponseSection({ responseBody, responseCode, responseStatus }: ResponseSectionProps) {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [responseData, setResponseData] = useState<string>('');

  useEffect(() => {
    setResponseData(responseBody);
  }, [responseBody]);

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
      <Typography variant="h4">{t('response_header')}</Typography>
      {Boolean(responseCode) && (
        <Typography variant="h6">
          {t('http_response')}: {responseCode} {responseStatus}
        </Typography>
      )}
      {responseData ?
        <RequestBodyEditor
          mode={BodyType.json}
          options={{
            readOnly: true,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
          initialValue={responseData}
        />
      : <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
          {t('response_placeholder')}
        </Typography>
      }
    </Box>
  );
}
