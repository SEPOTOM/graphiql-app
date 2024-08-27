'use client';

import { Box } from '@mui/material';
import MenuTab from './menuTab/menuTab';
import EndpointsForm from './endpointsForm/endpointsForm';

export default function GraphiQlClient() {
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
      <Box display="flex" width="100%" height="200px" border={1}>
        Query editor will be here
      </Box>
      <MenuTab />
    </Box>
  );
}
