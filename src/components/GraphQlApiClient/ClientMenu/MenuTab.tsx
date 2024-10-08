'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { GraphQlMenuTabs } from '@/types';
import { useLanguage, useTranslation } from '@/hooks';
import CustomTabPanel from './MenuTabPanel';

export default function MenuTab() {
  const tabs = Object.values(GraphQlMenuTabs) as string[];
  const [value, setValue] = useState(0);
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab) => (
            <Tab key={tab} label={t(`${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={tab} index={index} content={t(`${tab}`)} value={value} />
      ))}
    </Box>
  );
}
