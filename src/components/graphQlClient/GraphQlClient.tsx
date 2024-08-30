'use client';

import { Box } from '@mui/material';
import MenuTab from './menuTab/MenuTab';
import EndpointsForm from './endpointsForm/EndpointsForm';

export default function GraphQlClient() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
        paddingTop: '20px',
      }}
    >
      <EndpointsForm />
      <MenuTab />
    </Box>
  );
}
