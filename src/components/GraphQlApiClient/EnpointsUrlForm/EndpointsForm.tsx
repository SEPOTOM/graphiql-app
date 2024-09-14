'use client';

import { decodeFromBase64, encodeToBase64, getNewURLPath, makeGraphQLRequest } from '@/services';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema, variablesGraphQLSchema } from '@/utils';
import { useLanguage, useLocalStorage, useTranslation } from '@/hooks';
import { useGraphQl } from '@/contexts';
import { GraphQlRequest, GraphQlEditorErrorTypes, RequestHistoryItem, StorageKey, SegmentIndex } from '@/types';

export default function EndpointsForm() {
  const {
    endpointUrl,
    setEndpointUrl,
    endpointSdlUrl,
    setEndpointSdlUrl,
    paramData,
    queryText,
    setResponseText,
    setResponseStatus,
    setResponseStatusText,
    setSchemaGraphQL,
  } = useGraphQl();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [errorMessage, setErrorMessage] = useState('');
  const showError = !!errorMessage;
  const [_, setSavedRequests] = useLocalStorage<RequestHistoryItem[]>(StorageKey.Requests, []);

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newUrlPath = event.target.value;
    const encodedEndpoint = encodeToBase64(newUrlPath);
    const newPath = getNewURLPath(pathname, encodedEndpoint);
    window.history.replaceState(null, '', newPath);
    setEndpointUrl(newUrlPath);
    setEndpointSdlUrl(newUrlPath);
  };

  const handleEndpointBlur = async () => {
    try {
      const schema = (await makeGraphQLRequest(
        graphQLSchemaQuery,
        variablesGraphQLSchema,
        endpointSdlUrl,
        headersGraphQLSchema
      )) as GraphQlRequest;
      schema.code === 'OK' ? setSchemaGraphQL(schema.data) : setSchemaGraphQL('Schema not found');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleEndpointSdlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSdlPath = event.target.value;
    setEndpointSdlUrl(newSdlPath);
  };

  const handleOnclick = async () => {
    const headers: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      headers[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    const variables: HeadersInit = Object.fromEntries(
      paramData
        .filter((item) => item.check === true)
        .map((item) => [item.key, String(Number(item.value) ? Number(item.value) : item.value)])
    );
    try {
      const res = (await makeGraphQLRequest(queryText, variables, endpointUrl, headers)) as GraphQlRequest;
      const data = JSON.parse(res.data);
      setResponseText(JSON.stringify(data, null, jsonTabs));
      setResponseStatus(res.status);
      setResponseStatusText(res.code);
      const newRequest: RequestHistoryItem = {
        id: new Date().toISOString(),
        client: 'GRAPHQL',
        endpoint: endpointUrl,
        body: queryText ? queryText : '',
        headers: `${searchParams}`,
        timestamp: Date.now(),
      };
      setSavedRequests((prevHistory) => [newRequest, ...prevHistory].sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      if (error instanceof Error) {
        error.name === GraphQlEditorErrorTypes.SyntaxError ?
          setErrorMessage(t('graphQL_syntax_error_message'))
        : setErrorMessage(t('graphQL_else_error_message'));
      }
    }
  };

  useEffect(() => {
    const pathNameFromUrl = pathname.split('/').at(SegmentIndex.Endpoint);
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
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
