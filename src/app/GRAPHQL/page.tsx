import { Container } from '@mui/material';
import { GraphiQlClient } from '@/components';
import Box from '@mui/material/Box';

export default function GraphiQlClientPage() {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding={4}>
      <GraphiQlClient />
      <Box display="flex" width="100%" height="200px" border={1}>
        Response will be here
      </Box>
    </Box>
  );
}
