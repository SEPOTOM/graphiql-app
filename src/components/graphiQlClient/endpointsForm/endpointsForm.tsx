'use client';

import { getNewURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/constants/constants';

export default function EndpointsForm() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/').splice(2).join('/') || '';

  const [sdlPath, setSdlPath] = useState(atob(currentEndpoint));

  const handleEndpointUrlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndPoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodedEndPoint);
    window.history.replaceState(null, '', newPath);

    setSdlPath(event.target.value);
    makeGraphQLRequest(graphQLSchemaQuery, event.target.value, headersGraphQLSchema);
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSdlPath(event.target.value);
    makeGraphQLRequest(graphQLSchemaQuery, event.target.value, headersGraphQLSchema);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          value={atob(currentEndpoint)}
          id="endpoint-url"
          label="Endpoint URL"
          variant="outlined"
          onChange={handleEndpointUrlChange}
          placeholder="Enter Endpoint URL"
          fullWidth
        />
        <Button variant="outlined">Send</Button>
      </Box>
      <Box display="flex" width="100%">
        <TextField
          value={sdlPath}
          id="sdl-url"
          label="SDL URL"
          variant="outlined"
          onChange={handleEndpointSdlChange}
          placeholder="Enter SDL URL"
          fullWidth
        />
      </Box>
    </Box>
  );
}
