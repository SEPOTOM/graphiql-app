'use client';

import { getNewGraphQlURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils';
import { useTranslation } from '@/hooks';

export default function EndpointsForm() {
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);
  const [urlPath, setUrlPath] = useState('');
  const [sdlPath, setSdlPath] = useState('');

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newUrlPath = event.target.value;
    const encodedEndpoint = btoa(newUrlPath);
    const newPath = getNewGraphQlURLPath(pathname, encodedEndpoint);
    window.history.replaceState({ ...window.history.state, as: newPath, url: newPath }, '', newPath);
    setUrlPath(newUrlPath);
    setSdlPath(newUrlPath);
    makeGraphQLRequest(graphQLSchemaQuery, newUrlPath, headersGraphQLSchema);
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSdlPath = event.target.value;
    setSdlPath(newSdlPath);
    makeGraphQLRequest(graphQLSchemaQuery, newSdlPath, headersGraphQLSchema);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          value={urlPath}
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
