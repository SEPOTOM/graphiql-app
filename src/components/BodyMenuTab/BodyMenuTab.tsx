'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { MenuTabsRest, SegmentIndex } from '@/types/enum';
import RequestBodyMenuTabs from './RequestBodyMenuTabs';
import { useState, SyntheticEvent, useEffect } from 'react';
import { RequestBody } from '@/components';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';

export default function BodyMenuTab() {
  const pathname = usePathname();
  const lng = pathname.split('/').at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const tabs = Object.values(MenuTabsRest) as string[];
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabPanels = [
    { label: 'Variables', content: 'Variables' },
    { label: 'Headers', content: 'Headers' },
    { label: 'RequestBody', content: <RequestBody /> },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" gap={1}>
      <Box display="flex" width="100%" gap={1}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {tabs.map((tab) => (
            <Tab key={tab} label={t(`${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {tabPanels.map(({ label, content }, index) => (
        <RequestBodyMenuTabs key={label} index={index} value={value}>
          {content}
        </RequestBodyMenuTabs>
      ))}
    </Box>
  );
}
