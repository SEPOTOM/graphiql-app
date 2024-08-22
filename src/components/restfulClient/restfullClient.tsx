'use client';

import MethodSelector from '@/components/restfulClient/methodSelector/methodSelector';
import { Method } from '@/types/enum';
import { ChangeEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Box, Container } from '@mui/material';
import EndpointInput from './endpoinInput/endpointInput';

export default function RestfullClient() {
  const [method, setMethod] = useState<string>(Method.Get);
  const [endpoint, setEndpoint] = useState<string>('');

  const handleSelect = (event: SelectChangeEvent) => {
    setMethod(event.target.value);
  };

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEndpoint(btoa(event.target.value));
  };
  return (
    <Container>
      <Box display="flex" gap={4} paddingTop={4}>
        <MethodSelector method={method} handleSelect={handleSelect} />
        <EndpointInput handleChange={handleEndpointChange} />
      </Box>
    </Container>
  );
}
