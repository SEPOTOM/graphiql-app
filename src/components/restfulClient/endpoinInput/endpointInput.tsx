'use clent';

import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface EndpointInputProps {
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EndpointInput({ handleChange }: EndpointInputProps) {
  return (
    <TextField
      id="outlined-basic"
      label="URL"
      variant="outlined"
      onChange={handleChange}
      placeholder="Enter URL"
      fullWidth
    />
  );
}
