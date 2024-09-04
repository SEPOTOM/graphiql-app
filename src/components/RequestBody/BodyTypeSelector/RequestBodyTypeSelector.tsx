'use client';

import { BodyType, SegmentIndex } from '@/types';
import { Box, FormControl, NativeSelect } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useTranslation } from '@/hooks';

export interface RequestBodyTypeSelectorProps {
  bodytype: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function RequestBodyTypeSelector({ bodytype, handleChange }: RequestBodyTypeSelectorProps) {
  const pathname = usePathname();
  const lng = pathname.split('/').at(SegmentIndex.Languague) ?? 'en';
  const { t } = useTranslation(lng);
  const options = [
    { value: BodyType.json, label: 'JSON' },
    { value: BodyType.text, label: t('body_type_text') },
  ];

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <NativeSelect value={bodytype} onChange={handleChange} inputProps={{ 'aria-label': 'Request body mode' }}>
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
