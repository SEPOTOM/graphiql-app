'use client';

import { Box } from '@mui/material';
import EndpointInput from './endpoinInput/EndpointInput';
import MethodSelector from './methodSelector/MethodSelector';

export default function RestfullClient() {
  return (
    <Box display="flex" gap={4} paddingTop={4}>
      <MethodSelector />
      <EndpointInput />
    </Box>
  );
}
