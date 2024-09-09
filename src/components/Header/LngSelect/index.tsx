'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

import { useTranslation } from '@/hooks';
import { languages } from '@/utils';

import { LanguagesMap, LngSelectProps } from './types';

const languagesMap: LanguagesMap = {
  en: 'English',
  ru: 'Русский',
};

const LngSelect = ({ lng }: LngSelectProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation(lng);

  const handleLngChange = (e: SelectChangeEvent) => {
    const newLng = e.target.value;

    if (newLng !== lng) {
      router.replace(pathname.replace(lng, newLng));
    }
  };

  const width = isSmallScreen ? '100%' : 150;

  return (
    <FormControl sx={{ flexDirection: 'row', width, mr: isSmallScreen ? 0 : 2 }} size="small">
      <Select
        id="switch-lng"
        value={lng}
        onChange={handleLngChange}
        aria-label={t('header.lng_switcher_label')}
        input={<OutlinedInput sx={{ width }} startAdornment={<LanguageIcon sx={{ mr: 1 }} />} />}
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
