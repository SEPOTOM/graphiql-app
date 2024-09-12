import { ButtonProps } from '@mui/material';

export interface LinkMetadata {
  title: string;
  href: string;
  variant?: ButtonProps['variant'];
}
