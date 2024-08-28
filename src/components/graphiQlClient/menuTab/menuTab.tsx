'use client';

import { Box, Tab, Tabs } from '@mui/material';
import CustomTabPanel from './MenuTabPanel';
import React from 'react';
import { MenuTabs } from '@/types/enum';

export default function MenuTab() {
  const tabs = Object.values(MenuTabs) as string[];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={tab} index={index} content={tab} value={value} />
      ))}
    </Box>
  );
}
