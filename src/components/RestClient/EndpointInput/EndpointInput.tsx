'use client';

import { useLanguage, useTranslation } from '@/hooks';
import { decodeFromBase64, encodeToBase64, getNewURLPath } from '@/services';
import { SegmentIndex } from '@/types';
import TextField from '@mui/material/TextField';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function EndpointInput() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const currentEndpoint = pathname.split('/').at(SegmentIndex.Endpoint) || '';

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndpoint = encodeToBase64(event.target.value);
    const params = new URLSearchParams(searchParams.toString());
    const newPath = `${getNewURLPath(pathname, encodedEndpoint)}?${params}`;
    window.history.replaceState(null, '', newPath);
  };

  return (
    <TextField
      value={decodeFromBase64(currentEndpoint)}
      id="url-input"
      label="URL"
      variant="outlined"
      onChange={handleEndpointChange}
      placeholder={t('endpoint_placeholder')}
      fullWidth
    />
  );
}
