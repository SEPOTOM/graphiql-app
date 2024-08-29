'use client';

import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { MenuTabsRest } from '@/types/enum';
import CustomTabPanel from './menuTabPanel';
import RequestBodyEditor from '../restfullClient/requestBody/RequestBodyEditor';

export default function MenuTab() {
  const tabs = Object.values(MenuTabsRest) as string[];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel index={0} value={value}>
        Variables
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        Headers
      </CustomTabPanel>
      <CustomTabPanel index={2} value={value}>
        <RequestBodyEditor />
      </CustomTabPanel>
    </Box>
  );
}
