'use client';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Method, SegmentIndex } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getNewMethodPath } from '@/services';
import { useLanguage, useTranslation } from '@/hooks';

export default function RequestMethodSelector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const methods = Object.values(Method) as string[];
  const pathNameMethod = pathname.split('/').at(SegmentIndex.Method) ?? Method.Get;
  const [method, setMethod] = useState<string>(pathNameMethod);

  const handleSelect = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedMethod = event.target.value;
    setMethod(selectedMethod);
    const newPath = `${getNewMethodPath(pathname, selectedMethod, methods)}?${params}`;
    window.history.replaceState(null, '', newPath);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-method-label">{t('method_label')}</InputLabel>
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
