'use client';

import { getNewURLPath } from '@/services/getNewPath';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function EndpointForm() {
  const pathname = usePathname();

  const handleEndpointUrlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndpoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodedEndpoint);
    window.history.replaceState(null, '', newPath);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          className="red"
          id="endpoint-url"
          label="Endpoint URL"
          variant="outlined"
          onChange={handleEndpointUrlChange}
          placeholder="Enter Endpoint URL"
          fullWidth
        />
        <Button variant="outlined">Send</Button>
      </Box>
    </Box>
  );
}
