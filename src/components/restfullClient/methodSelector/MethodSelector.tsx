'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Method, SegmentIndex } from '@/types/enum';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getNewMethodPath } from '@/services';

export default function MethodSelector() {
  const pathname = usePathname();
  const methods = Object.values(Method) as string[];
  const pathNameMethod = pathname.split('/')[SegmentIndex.Method];
  const currentMethod = methods.includes(pathNameMethod) ? pathNameMethod : Method.Get;
  const [method, setMethod] = useState<string>(currentMethod);

  const handleSelect = (event: SelectChangeEvent) => {
    const selectedMethod = event.target.value;
    setMethod(selectedMethod);
    const newPath = getNewMethodPath(pathname, selectedMethod, methods);
    window.history.replaceState(null, '', newPath);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-method-label">Method</InputLabel>
      <Select labelId="select-method-label" id="select-method" value={method} label="Method" onChange={handleSelect}>
        {methods.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
