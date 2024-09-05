'use client';

import { Box, Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Method, SegmentIndex } from '@/types';
import { useEffect, useState, useTransition } from 'react';
import { BodyMenuTab, ResponseSection } from '@/components';
import EndpointInput from './EndpointInput/EndpointInput';
import RequestMethodSelector from './RequestMethodSelector/RequestMethodSelector';
import { decodeFromBase64 } from '@/services';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks';

export default function RestfullClient() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const router = useRouter();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [resData, setResData] = useState('');

  useEffect(() => {
    const method = segments[SegmentIndex.Method];
    if (!method) {
      const newPath = `${pathname}/${Method.Get}`;
      router.replace(newPath);
    } else if (!(Object.values(Method) as string[]).includes(method)) {
      segments.splice(SegmentIndex.Method, 0, Method.Get);
      const newPath = segments.join('/');
      router.replace(newPath);
    }
  }, [pathname, router, segments]);

  const handleSubmit = async () => {
    const method = segments[SegmentIndex.Method];
    const endpoint = decodeFromBase64(segments[SegmentIndex.Endpoint]);
    const body = segments[SegmentIndex.Body] ? decodeFromBase64(segments[SegmentIndex.Body]) : null;

    try {
      const response = await fetch(`/restfullClient/api`, {
        method: 'POST',
        body: JSON.stringify({ method, endpoint, body }),
      });

      setStatus(response.status);
      setStatusText(response.statusText);

      if (response.status === 204 || response.headers.get('content-length') === '0') {
        setResData(`${t('empty_response')}`);
        return;
      }
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = await response.text();
      }

      setResData(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch (error) {
      //TO DO add notification
      console.error(error);
      setStatus(0);
      setStatusText('');
      setResData('');
    }
  };

  return (
    <Box display="flex" flexDirection={'column'} gap={2}>
      <Box display="flex" gap={4} paddingTop={4}>
        <RequestMethodSelector />
        <EndpointInput />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <BodyMenuTab />
      <ResponseSection responseBody={resData} responseCode={status} responseStatus={statusText} />
    </Box>
  );
}
