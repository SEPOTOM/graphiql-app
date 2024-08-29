'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Method } from '@/types/enum';
import { useEffect } from 'react';
import EndpointInput from './endpoinInput/EndpointInput';
import MethodSelector from './methodSelector/MethodSelector';
import MenuTab from '../menuTab/menuTab';

export default function RestfullClient() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const router = useRouter();

  useEffect(() => {
    const method = segments[3];
    if (!method) {
      const newPath = `${pathname}/${Method.Get}`;
      router.replace(newPath);
    } else if (!(Object.values(Method) as string[]).includes(method)) {
      segments.splice(3, 0, Method.Get);
      const newPath = segments.join('/');
      router.replace(newPath);
    }
  }, [pathname, router, segments]);

  return (
    <Box display="flex" flexDirection={'column'} gap={2}>
      <Box display="flex" gap={4} paddingTop={4}>
        <MethodSelector />
        <EndpointInput />
      </Box>
      <MenuTab />
    </Box>
  );
}
