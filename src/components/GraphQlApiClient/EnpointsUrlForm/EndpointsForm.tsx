'use client';

import { decodeFromBase64, encodeToBase64, getNewGraphQlURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema, variablesGraphQLSchema } from '@/utils';
import { useTranslation } from '@/hooks';
import { useGraphQl } from '@/contexts';
import { GraphQlRequest } from '@/types';

export default function EndpointsForm() {
  const {
    endpointUrl,
    setEndpointUrl,
    endpointSdlUrl,
    setEndpointSdlUrl,
    paramData,
    headerData,
    queryText,
    setResponseText,
    setResponseStatus,
    setResponseStatusText,
  } = useGraphQl();
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newUrlPath = event.target.value;
    const encodedEndpoint = encodeToBase64(newUrlPath);
    const newPath = getNewGraphQlURLPath(pathname, encodedEndpoint);
    window.history.replaceState(null, '', newPath);
    setEndpointUrl(newUrlPath);
    setEndpointSdlUrl(newUrlPath);
  };

  const handleEndpointBlur = async () => {
    const schema = await makeGraphQLRequest(
      graphQLSchemaQuery,
      variablesGraphQLSchema,
      endpointSdlUrl,
      headersGraphQLSchema
    );
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSdlPath = event.target.value;
    setEndpointSdlUrl(newSdlPath);
  };

  const handleOnclick = async () => {
    const headers: HeadersInit = Object.fromEntries(
      headerData.filter((item) => item.check === true).map((item) => [item.key, item.value])
    );
    const variables: HeadersInit = Object.fromEntries(
      paramData
        .filter((item) => item.check === true)
        .map((item) => [item.key, Number(item.value) ? Number(item.value) : item.value])
    );
    const res = (await makeGraphQLRequest(queryText, variables, endpointUrl, headers)) as GraphQlRequest;
    setResponseText(JSON.parse(res.data));
    setResponseStatus(res.status);
    setResponseStatusText(res.code);
  };

  useEffect(() => {
    const pathNameFromUrl = pathname.split('/').at(3);
    if (pathNameFromUrl) {
      const decodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
      setEndpointUrl(decodedPathNameFromUrl);
      setEndpointSdlUrl(decodedPathNameFromUrl);
    }
  }, [pathname, setEndpointSdlUrl, setEndpointUrl]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <TextField
          value={endpointUrl}
          id="url-input"
          label={t('graphQl_endpoint_input_label')}
          variant="outlined"
          onChange={handleEndpointChange}
          onBlur={handleEndpointBlur}
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
          onBlur={handleEndpointBlur}
          placeholder={t('graphQl_SDL_input_placeholder')}
          fullWidth
        />
      </Box>
    </Box>
  );
}
