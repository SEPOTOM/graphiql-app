import { ButtonProps } from '@mui/material';

export interface LinkMetadata {
  titleTKey: string;
  href: string;
  variant?: ButtonProps['variant'];
}
