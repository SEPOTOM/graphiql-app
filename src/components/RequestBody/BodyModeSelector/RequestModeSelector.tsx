import { BodyType } from '@/types/enum';
import { Box, FormControl, NativeSelect } from '@mui/material';
import { ChangeEvent } from 'react';

export interface RequestModeSelectorProps {
  mode: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function RequestModeSelector({ mode, handleChange }: RequestModeSelectorProps) {
  const options = [
    { value: BodyType.json, label: 'JSON' },
    { value: BodyType.text, label: 'Text' },
  ];

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <NativeSelect value={mode} onChange={handleChange} inputProps={{ 'aria-label': 'Request body mode' }}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
