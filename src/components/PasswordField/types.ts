import { TextFieldProps } from '@mui/material';

export interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  lng: string;
}
