import { GraphQlClient } from '@/components';
import Box from '@mui/material/Box';
import { GraphQlDataProvider } from '@/contexts';

export default function GraphQlClientPage() {
  return (
    <GraphQlDataProvider>
      <Box display="flex" flexGrow={1} flexDirection="column" gap={2} padding={4}>
        <GraphQlClient />
      </Box>
    </GraphQlDataProvider>
  );
}
