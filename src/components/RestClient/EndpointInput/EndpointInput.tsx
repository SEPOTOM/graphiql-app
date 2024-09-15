'use client';

import { useLanguage, useTranslation } from '@/hooks';
import { decodeFromBase64, encodeToBase64, getNewURLPath } from '@/services';
import { SegmentIndex } from '@/types';
import TextField from '@mui/material/TextField';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export default function EndpointInput() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [endpointValue, setEndpointValue] = useState('');

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newEndpoint = event.target.value;
    const encodedEndpoint = encodeToBase64(newEndpoint);
    const params = new URLSearchParams(searchParams.toString());
    const newPath = `${getNewURLPath(pathname, encodedEndpoint)}?${params}`;
    window.history.replaceState(null, '', newPath);
    setEndpointValue(newEndpoint);
  };

  useEffect(() => {
    const pathNameFromUrl = pathname.split('/').at(SegmentIndex.Endpoint);
    if (pathNameFromUrl) {
      const decodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
      setEndpointValue(decodedPathNameFromUrl);
    }
  }, [pathname, setEndpointValue]);

  return (
    <TextField
      value={endpointValue}
      id="url-input"
      label="URL"
      variant="outlined"
      onChange={handleEndpointChange}
      placeholder={t('endpoint_placeholder')}
      fullWidth
    />
  );
}
