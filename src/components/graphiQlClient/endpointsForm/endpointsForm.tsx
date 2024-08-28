'use client';

import { getNewURLPath } from '@/services/getNewPath';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { makeGraphQLRequest } from '@/services/makeGraphQlRequests';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/constants/constants';

export default function EndpointsForm() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/').splice(2).join('/') || '';

  const [sdlPath, setSdlPath] = useState('');

  const handleEndpointUrlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndPoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodedEndPoint);
    window.history.replaceState(null, '', newPath);
    setSdlPath(event.target.value);
    makeGraphQLRequest(graphQLSchemaQuery, event.target.value, headersGraphQLSchema);
  };

  const handleEndpointSdlFocus = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.target.value = sdlPath;
  };

  const handleEndpointSdlFBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.target.value = '';
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
          id="sdl-url"
          label="SDL URL"
          variant="outlined"
          onFocus={handleEndpointSdlFocus}
          onBlur={handleEndpointSdlFBlur}
          onChange={handleEndpointSdlChange}
          placeholder="Enter SDL URL"
          fullWidth
        />
      </Box>
    </Box>
  );
}
