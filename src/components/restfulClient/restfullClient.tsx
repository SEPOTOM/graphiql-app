'use client';

import MethodSelector from '@/components/restfulClient/methodSelector/methodSelector';
import { Box } from '@mui/material';
import EndpointInput from './endpoinInput/endpointInput';

import path from 'path';

export default function RestfullClient() {
  return (
    <Box display="flex" gap={4} paddingTop={4}>
      <MethodSelector />
      <EndpointInput />
    </Box>
  );
}
