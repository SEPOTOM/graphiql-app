'use client';

import MethodSelector from '@/components/restfullClient/methodSelector/methodSelector';
import { Box } from '@mui/material';
import EndpointInput from './endpoinInput/endpointInput';

export default function RestfullClient() {
  return (
    <Box display="flex" gap={4} paddingTop={4}>
      <MethodSelector />
      <EndpointInput />
    </Box>
  );
}
