'use client';

import { getNewURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants/constants';
import { useTranslation } from '@/hooks';

export default function EndpointsForm() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/').splice(3).join('/') || '';
  const lng = pathname.split('/').splice(1, 1)[0];
  const { t } = useTranslation(lng);

  const [inputPath, setInputPath] = useState(atob(currentEndpoint));
  const [sdlPath, setSdlPath] = useState(inputPath);

  const handleEndpointUrlChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const encodedEndPoint = btoa(event.target.value);
    const newPath = getNewURLPath(pathname, encodedEndPoint);
    setInputPath(event.target.value);
    window.history.replaceState(
      {
        ...window.history.state,
        as: newPath,
        url: newPath,
      },
      '',
      newPath
    );
    makeGraphQLRequest(graphQLSchemaQuery, event.target.value, headersGraphQLSchema);
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSdlPath(event.target.value);
    makeGraphQLRequest(graphQLSchemaQuery, event.target.value, headersGraphQLSchema);
  };

  const handleEndpointSdlSelect = () => {
    setSdlPath(inputPath);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          data-testid="endpoint-url"
          value={inputPath}
          id="endpoint-url"
          label={t('graphQlEndpointInputLabel')}
          variant="outlined"
          onChange={handleEndpointUrlChange}
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
          onSelect={handleEndpointSdlSelect}
          placeholder={t('graphQlSDLInputPlaceholder')}
          fullWidth
        />
      </Box>
    </Box>
  );
}
