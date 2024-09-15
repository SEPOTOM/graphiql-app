'use client';

import { Box, Typography } from '@mui/material';
import { useGraphQl } from '@/contexts';
import SchemaGraphQlTab from './SchemaGraphQLTab/SchemaGraphQlTab';

export default function SchemaGraphQL() {
  const { schemaGraphQL } = useGraphQl();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      {schemaGraphQL === 'Schema not found' ?
        <Typography>Schema is not available</Typography>
      : <SchemaGraphQlTab heading="Schema" />}
    </Box>
  );
}
