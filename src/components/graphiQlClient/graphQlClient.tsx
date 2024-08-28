'use client';

import { Box } from '@mui/material';
import MenuTab from './menuTab/menuTab';
import EndpointsForm from './endpointsForm/endpointsForm';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { makeGraphQLRequest } from '@/services/makeGraphQlRequests';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/constants/constants';

export default function GraphQlClient() {
  const pathname = usePathname();
  const currentEndpoint = pathname.split('/').splice(2).join('/') || '';
  const router = useRouter();

  useEffect(() => {
    if (currentEndpoint === '') {
      const newPath = `${pathname}`;
      router.replace(newPath);
    } else {
      router.replace(pathname);
    }
    makeGraphQLRequest(graphQLSchemaQuery, atob(currentEndpoint), headersGraphQLSchema);
  }, []);

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
