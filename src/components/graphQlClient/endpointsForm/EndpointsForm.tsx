'use client';

import { getNewGraphQlURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants';
import { useTranslation } from '@/hooks';

export default function EndpointsForm() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/')[3] || '';
  const lng = pathname.split('/').splice(1, 1)[0];
  const { t } = useTranslation(lng);
  const [sdlPath, setSdlPath] = useState('');

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndpoint = btoa(event.target.value);
    const newPath = getNewGraphQlURLPath(pathname, encodedEndpoint);
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
          id="url-input"
          label={t('graphQlEndpointInputLabel')}
          variant="outlined"
          onChange={handleEndpointChange}
          placeholder={t('graphQlEndpointInputPlaceholder')}
          fullWidth
        />
        <Button variant="outlined">{t('graphQlSendButton')}</Button>
      </Box>
      <Box display="flex" width="100%">
        <TextField
          value={sdlPath}
          id="sdl-url"
          label={t('graphQlSDLInputLabel')}
          variant="outlined"
          onChange={handleEndpointSdlChange}
          placeholder={t('graphQlSDLInputPlaceholder')}
          fullWidth
        />
      </Box>
    </Box>
  );
}
