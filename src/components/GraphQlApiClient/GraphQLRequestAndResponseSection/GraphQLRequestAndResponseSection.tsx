'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { ResponseSection } from '@/components';
import GraphQlRequestBody from '../GraphQLRequestBody/GraphQLRequestBody';

export default function GraphQLAndResponseAndRequestSection() {
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <GraphQlRequestBody />
      </Box>
      <Box display="flex" width="100%" border="1px solid rgba(224, 224, 224, 1)">
        <ResponseSection responseBody={JSON.stringify('')} responseCode={200} responseStatus={'ok'} />
      </Box>
    </Box>
  );
}
