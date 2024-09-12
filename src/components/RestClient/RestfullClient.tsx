'use client';

import { Alert, Box, Button, Snackbar } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Method, RequestHistoryItem, SegmentIndex, StorageKey } from '@/types';
import { useEffect, useState } from 'react';
import { BodyMenuTab, ResponseSection } from '@/components';
import EndpointInput from './EndpointInput/EndpointInput';
import RequestMethodSelector from './RequestMethodSelector/RequestMethodSelector';
import { decodeFromBase64 } from '@/services';
import { useLanguage, useLocalStorage, useTranslation } from '@/hooks';
import { jsonTabs, noContentStatus } from './consts';

export default function RestfullClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split('/');
  const router = useRouter();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [resData, setResData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [_, setSavedRequests] = useLocalStorage<RequestHistoryItem[]>(StorageKey.Requests, []);
  const showError = !!errorMessage;

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
    try {
      const method = segments[SegmentIndex.Method];
      const endpoint = decodeFromBase64(segments.at(SegmentIndex.Endpoint) ?? '');
      const body = segments[SegmentIndex.Body] ? decodeFromBase64(segments[SegmentIndex.Body]) : null;
      const headers: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        headers[decodeURIComponent(key)] = decodeURIComponent(value);
      });

      if (!endpoint || endpoint.trim() === '') {
        throw new Error(t('error_empty_endpoint'));
      }

      const response = await fetch(`/restfullClient/api`, {
        method: 'POST',
        body: JSON.stringify({ method, endpoint, body, headers }),
      });

      const newRequest: RequestHistoryItem = {
        id: new Date().toISOString(),
        client: `restfullClient/${method}`,
        endpoint,
        body: body ? body : '',
        headers: `${searchParams}`,
        timestamp: Date.now(),
      };
      setSavedRequests((prevHistory) => [newRequest, ...prevHistory].sort((a, b) => b.timestamp - a.timestamp));
      setStatus(response.status);
      setStatusText(response.statusText);

      if (response.status === noContentStatus || response.headers.get('content-length') === '0') {
        setResData(`${t('empty_response')}`);
        return;
      }

      let data;
      const text = await response.text();

      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      setResData(typeof data === 'string' ? data : JSON.stringify(data, null, jsonTabs));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
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
          {t('send_button_text')}
        </Button>
      </Box>
      <BodyMenuTab />
      <ResponseSection responseBody={resData} responseCode={status} responseStatus={statusText} />
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
