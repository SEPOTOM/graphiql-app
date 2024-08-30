'use client';

import { Box, Tab, Tabs } from '@mui/material';
import CustomTabPanel from './MenuTabPanel';
import React from 'react';
import { GraphQlMenuTabs } from '@/types/enum';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';

export default function MenuTab() {
  const tabs = Object.values(GraphQlMenuTabs) as string[];
  const pathname = usePathname();
  const [value, setValue] = React.useState(0);
  const lng = pathname.split('/').splice(1, 1)[0];
  const { t } = useTranslation(lng);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
