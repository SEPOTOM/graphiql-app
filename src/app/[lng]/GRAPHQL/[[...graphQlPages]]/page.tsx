import { GraphQlClient } from '@/components';
import Box from '@mui/material/Box';

export default function GraphQlClientPage() {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding={4}>
      <GraphQlClient />
    </Box>
  );
}
