'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Method } from '@/types/enum';
import styles from './methodSelector.module.scss';

interface MethodSelectorProps {
  method: string;
  handleSelect: (event: SelectChangeEvent) => void;
}

export default function MethodSelector({ method, handleSelect }: MethodSelectorProps) {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-method-label">Method</InputLabel>
      <Select labelId="select-method-label" id="select-method" value={method} label="Method" onChange={handleSelect}>
        {Object.values(Method).map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
