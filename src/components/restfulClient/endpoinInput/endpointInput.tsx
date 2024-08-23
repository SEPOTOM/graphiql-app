'use clent';

import { getNewURLPath } from '@/services';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function EndpointInput() {
  const pathname = usePathname();

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodeEndpoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodeEndpoint);
    window.history.replaceState(null, '', newPath);
  };
  return (
    <TextField
      id="outlined-basic"
      label="URL"
      variant="outlined"
      onChange={handleEndpointChange}
      placeholder="Enter URL"
      fullWidth
    />
  );
}
