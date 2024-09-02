import { BodyType, SegmentIndex } from '@/types/enum';
import { Box, FormControl, NativeSelect } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useTranslation } from '@/hooks';

export interface RequestModeSelectorProps {
  mode: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function RequestModeSelector({ mode, handleChange }: RequestModeSelectorProps) {
  const pathname = usePathname();
  const lng = pathname.split('/')[SegmentIndex.Languague];
  const { t } = useTranslation(lng);
  const options = [
    { value: BodyType.json, label: 'JSON' },
    { value: BodyType.text, label: t('BodyTypeText') },
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
