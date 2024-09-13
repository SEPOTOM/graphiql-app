import { Box } from '@mui/material';

import { ContentBlockProps } from './types';

const ContentBlock = ({ children }: ContentBlockProps) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '24px',
        textAlign: 'left',
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default ContentBlock;
