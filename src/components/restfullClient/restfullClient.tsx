'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Method } from '@/types/enum';
import { useEffect } from 'react';
import EndpointInput from './endpoinInput/endpointInput';
import MethodSelector from './methodSelector/methodSelector';

export default function RestfullClient() {
  const pathname = usePathname();
  const method = pathname.split('/')[2];

  useEffect(() => {
    if (!method) {
      const newPath = `${pathname}/${Method.Get}`;
      window.history.replaceState(null, '', newPath);
    }
  }, []);

  return (
    <Box display="flex" gap={4} paddingTop={4}>
      <MethodSelector />
      <EndpointInput />
    </Box>
  );
}
