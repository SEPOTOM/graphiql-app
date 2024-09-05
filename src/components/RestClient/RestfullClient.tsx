'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Method, SegmentIndex } from '@/types';
import { useEffect } from 'react';
import { BodyMenuTab } from '@/components';
import EndpointInput from './EndpointInput/EndpointInput';
import RequestMethodSelector from './RequestMethodSelector/RequestMethodSelector';

export default function RestfullClient() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const router = useRouter();

  useEffect(() => {
    const method = segments[SegmentIndex.Method];
    if (!method) {
      const newPath = `${pathname}/${Method.Get}`;
      router.replace(newPath);
    } else if (!(Object.values(Method) as string[]).includes(method)) {
      segments.splice(SegmentIndex.Method, 0, Method.Get);
      const newPath = segments.join('/');
      router.replace(newPath);
    }
  }, [pathname, router, segments]);

  return (
    <Box display="flex" flexDirection={'column'} gap={2}>
      <Box display="flex" gap={4} paddingTop={4}>
        <RequestMethodSelector />
        <EndpointInput />
      </Box>
      <BodyMenuTab />
    </Box>
  );
}
