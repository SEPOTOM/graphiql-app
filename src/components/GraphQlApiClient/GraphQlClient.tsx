'use client';

import { Box } from '@mui/material';
import EndpointsForm from './EnpointsUrlForm/EndpointsForm';
import MenuTab from './ClientMenu/MenuTab';
import GraphQLAndResponseAndRequestSection from './GraphQLRequestAndResponseSection/GraphQLRequestAndResponseSection';

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
      <GraphQLAndResponseAndRequestSection />
      <MenuTab />
    </Box>
  );
}
