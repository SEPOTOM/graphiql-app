'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { HeadersAndVariablesEditorRowDataItem, MenuTabsRest } from '@/types';
import RequestBodyMenuTabs from './RequestBodyMenuTabs';
import { useState, SyntheticEvent, useEffect } from 'react';
import { EditorTable, RequestBody } from '@/components';
import { useLanguage, useTranslation } from '@/hooks';
import { usePathname, useSearchParams } from 'next/navigation';
import { encodeToBase64, decodeFromBase64 } from '@/services';
import useSavedVariables from '@/hooks/useSavedVariables';
import { VARIABLES_STORAGE_KEY } from './consts';

export default function BodyMenuTab() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const tabs = Object.values(MenuTabsRest) as string[];
  const [value, setValue] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const params = Array.from(searchParams.entries());
  const initializedRowsData = params.map(([key, value], index) => ({
    id: index,
    key: decodeFromBase64(key),
    value: decodeFromBase64(value),
    check: true,
  }));

  const [variables, setVariables] = useSavedVariables<HeadersAndVariablesEditorRowDataItem[]>(
    VARIABLES_STORAGE_KEY,
    []
  );

  const [headersRowsData, setHeadersRowsData] = useState<HeadersAndVariablesEditorRowDataItem[]>(initializedRowsData);
  const [variablesRowsData, setVariablesRowsData] = useState<HeadersAndVariablesEditorRowDataItem[]>([]);

  useEffect(() => {
    if (isClient) {
      setVariablesRowsData(variables);
    }
  }, [isClient, variables]);

  useEffect(() => {
    if (variablesRowsData.length) {
      setVariables(variablesRowsData);
    }
  }, [variablesRowsData]);

  useEffect(() => {
    const params = new URLSearchParams();
    headersRowsData.forEach((row) => {
      if (row.check && (row.value || row.key)) {
        const encodedKey = encodeToBase64(row.key);
        const encodedValue = encodeToBase64(row.value);
        params.set(encodedKey, encodedValue);
      } else {
        params.delete(row.key);
      }
      const newPath = `${pathname}?${params}`;
      window.history.replaceState(null, '', newPath);
    });
  }, [headersRowsData]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabPanels = [
    {
      label: 'Variables',
      content: (
        <EditorTable
          heading={t(MenuTabsRest.Variables)}
          currentEditorData={variablesRowsData}
          setCurrentEditorData={setVariablesRowsData}
        />
      ),
    },
    {
      label: 'Headers',
      content: (
        <EditorTable
          heading={t(MenuTabsRest.Headers)}
          currentEditorData={headersRowsData}
          setCurrentEditorData={setHeadersRowsData}
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
