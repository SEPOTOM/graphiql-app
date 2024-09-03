import { Alert, AlertTitle } from '@mui/material';

export interface ErrorsMessageProps {
  errorMessage: string;
}

export default function ErrorsMessageP({ errorMessage }: ErrorsMessageProps) {
  return (
    <Alert sx={{ position: 'absolute', zIndex: 10, top: '-85px', right: '0' }} severity="error">
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
    </Alert>
  );
}
