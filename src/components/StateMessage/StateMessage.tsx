import { Box, CircularProgress, Typography } from '@mui/material';

import { StateMessageProps } from './types';

const StateMessage = ({ children, showLoading }: StateMessageProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      {showLoading && <CircularProgress sx={{ mr: 2 }} />}
      <Typography variant="h4" component="p">
        {children}
      </Typography>
    </Box>
  );
};

export default StateMessage;
