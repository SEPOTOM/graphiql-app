'use client';

import { getNewGraphQlURLPath, makeGraphQLRequest } from '@/services';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils';
import { useTranslation } from '@/hooks';
import { ResponseSection } from '@/components';
import mockRequestData from '@/tests/mocks/responseData';
import GraphQlRequestBody from '../GraphQLRequestBody/GraphQLRequestBody';

export default function GraphQLAndResponseAndRequestSection() {
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <GraphQlRequestBody />
      </Box>
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <ResponseSection responseBody={JSON.stringify(mockRequestData)} responseCode={200} responseStatus={'ok'} />
      </Box>
    </Box>
  );
}
