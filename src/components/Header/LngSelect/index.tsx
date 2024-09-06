'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

import { languages } from '@/utils';

import { LanguagesMap, LngSelectProps } from './types';

const languagesMap: LanguagesMap = {
  en: 'English',
  ru: 'Русский',
};

const LngSelect = ({ lng }: LngSelectProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLngChange = (e: SelectChangeEvent) => {
    const newLng = e.target.value;

    if (newLng !== lng) {
      router.replace(pathname.replace(lng, newLng));
    }
  };

  return (
    <FormControl sx={{ flexDirection: 'row', width: 150, mr: 2 }} size="small">
      <Select
        labelId="switch-lng-label"
        id="switch-lng"
        value={lng}
        onChange={handleLngChange}
        aria-label="Select language"
        input={<OutlinedInput sx={{ width: 150 }} startAdornment={<LanguageIcon sx={{ mr: 1 }} />} />}
      >
        {languages.map((language) => (
          <MenuItem value={language} key={language}>
            {languagesMap[language]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LngSelect;
