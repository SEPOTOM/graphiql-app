'use client';

import { Box } from '@mui/material';
import { ResponseSection } from '@/components';
import GraphQlRequestBody from '../GraphQLRequestBody/GraphQLRequestBody';
import { useGraphQl } from '@/contexts';

export default function GraphQLAndResponseAndRequestSection() {
  const { responseText, responseStatus, responseStatusText } = useGraphQl();

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" width="100%">
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <GraphQlRequestBody />
      </Box>
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <ResponseSection
          responseBody={JSON.stringify(responseText)}
          responseCode={responseStatus}
          responseStatus={responseStatusText}
        />
      </Box>
    </Box>
  );
}
