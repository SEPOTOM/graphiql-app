'use client';

import { Box } from '@mui/material';
import EndpointForm from './endpointForm/endpointForm';
import SDLForm from './sdlForm/sdlForm';
import MenuTab from './menuTab/menuTab';

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
      <SDLForm />
      <EndpointForm />
      <Box display="flex" width="100%" height="200px" border={1}>
        Query editor will be here
      </Box>
      <MenuTab />
    </Box>
  );
}
