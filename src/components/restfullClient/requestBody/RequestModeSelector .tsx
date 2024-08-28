import { Box, FormControl, NativeSelect } from '@mui/material';
import React, { ChangeEvent } from 'react';

export interface RequestModeSelectorProps {
  mode: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function RequestModeSelector({ mode, handleChange }: RequestModeSelectorProps) {
  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <NativeSelect value={mode} onChange={handleChange} inputProps={{ 'aria-label': 'Reques body mode' }}>
          <option value={'JSON'}>JSON</option>
          <option value={'Text'}>Text</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
