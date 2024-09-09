import { Box, Slide, SlideProps, Snackbar, SnackbarContent } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

import { NotificationProps } from './types';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const Notification = ({
  children,
  TransitionComponent = SlideTransition,
  autoHideDuration = 3000,
  ...props
}: NotificationProps) => {
  return (
    <Snackbar
      {...props}
      TransitionComponent={TransitionComponent}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
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
