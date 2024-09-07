'use client';

import { getNewGraphQlURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils';
import { useTranslation } from '@/hooks';
import { useGraphQl } from '@/contexts';

export default function EndpointsForm() {
  const { endpointUrl, setEndpointUrl, endpointSdlUrl, setEndpointSdlUrl, paramData, headerData, queryText } =
    useGraphQl();
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  const handleEndpointChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newUrlPath = event.target.value;
    const encodedEndpoint = btoa(newUrlPath);
    const newPath = getNewGraphQlURLPath(pathname, encodedEndpoint);
    window.history.replaceState({ ...window.history.state, as: newPath, url: newPath }, '', newPath);
    setEndpointUrl(newUrlPath);
    setEndpointSdlUrl(newUrlPath);
    makeGraphQLRequest(graphQLSchemaQuery, newUrlPath, headersGraphQLSchema);
    const schema = await makeGraphQLRequest(graphQLSchemaQuery, newUrlPath, headersGraphQLSchema);
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSdlPath = event.target.value;
    setEndpointSdlUrl(newSdlPath);
    makeGraphQLRequest(graphQLSchemaQuery, newSdlPath, headersGraphQLSchema);
  };

  const handleOnclick = async () => {
    console.log('click function');
    console.log(endpointUrl);
    console.log(endpointSdlUrl);
    console.log(queryText);
    console.log(paramData);
    const headers: HeadersInit = Object.fromEntries(
      headerData.filter((item) => item.check === true).map((item) => [item.key, item.value])
    );
    console.log(headers);
    const res = await makeGraphQLRequest(queryText, endpointUrl, headers);
    console.log(JSON.stringify(res));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          value={endpointUrl}
          id="url-input"
          label={t('graphQl_endpoint_input_label')}
          variant="outlined"
          onChange={handleEndpointChange}
          placeholder={t('graphQl_endpoint_input_placeholder')}
          fullWidth
        />
        <Button variant="outlined" onClick={handleOnclick}>
          {t('graphQl_send_button')}
        </Button>
      </Box>
      <Box display="flex" width="100%">
        <TextField
          value={endpointSdlUrl}
          id="sdl-url"
          label={t('graphQl_SDL_input_label')}
          variant="outlined"
          onChange={handleEndpointSdlChange}
          placeholder={t('graphQl_SDL_input_placeholder')}
          fullWidth
        />
      </Box>
    </Box>
  );
}
