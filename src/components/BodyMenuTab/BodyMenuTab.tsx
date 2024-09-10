'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { HeadersAndVariablesEditorRowDataItem, MenuTabsRest } from '@/types';
import RequestBodyMenuTabs from './RequestBodyMenuTabs';
import { useState, SyntheticEvent, SetStateAction, useEffect } from 'react';
import { EditorTable, RequestBody } from '@/components';
import { useLanguage, useTranslation } from '@/hooks';
import { usePathname, useSearchParams } from 'next/navigation';

export default function BodyMenuTab() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const tabs = Object.values(MenuTabsRest) as string[];
  const [value, setValue] = useState(0);

  const params = Array.from(searchParams.entries());
  const initializedRowsData = params.map(([key, value], index) => ({
    id: index,
    key,
    value,
    check: true,
  }));

  const currentRowData: HeadersAndVariablesEditorRowDataItem[] = initializedRowsData;
  const [rowsData, setRowsData] = useState<HeadersAndVariablesEditorRowDataItem[]>(currentRowData);

  useEffect(() => {
    const params = new URLSearchParams();
    rowsData.forEach((row) => {
      if (row.check && (row.value || row.key)) {
        params.set(row.key, row.value);
      } else {
        params.delete(row.key);
      }
      const newPath = `${pathname}?${params}`;
      window.history.replaceState(null, '', newPath);
      console.log(newPath);
    });
  }, [rowsData]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabPanels = [
    { label: 'Variables', content: 'Variables' },
    {
      label: 'Headers',
      content: (
        <EditorTable
          heading={t(MenuTabsRest.Headers)}
          currentEditorData={rowsData}
          setCurrentEditorData={setRowsData}
        />
      ),
    },
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
