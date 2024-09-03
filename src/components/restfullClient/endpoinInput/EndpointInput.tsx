'use client';

import { getNewURLPath } from '@/services';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function EndpointInput() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/')[3] || '';

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndpoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodedEndpoint);
    window.history.replaceState(null, '', newPath);
  };

  return (
    <TextField
      value={atob(currentEndpoint)}
      id="url-input"
      label="URL"
      variant="outlined"
      onChange={handleEndpointChange}
      placeholder="Enter URL"
      fullWidth
    />
  );
}
