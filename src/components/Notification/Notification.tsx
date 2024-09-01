import { Box, Slide, SlideProps, Snackbar, SnackbarContent } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

import { NotificationProps } from './types';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const Notification = ({ children, ...props }: NotificationProps) => {
  return (
    <Snackbar
      {...props}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent
        message={
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ mr: 1 }} />
            {children}
          </Box>
        }
        sx={{
          backgroundColor: 'green',
          color: 'white',
        }}
      />
    </Snackbar>
  );
};

export default Notification;
