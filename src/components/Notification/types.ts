import { ReactNode } from 'react';
import { SnackbarProps } from '@mui/material';

export type NotificationProps = Omit<SnackbarProps, 'children'> & { children: ReactNode; isError?: boolean };
