'use client';

import { EditorTable } from '@/components';
import { useGraphQl } from '@/contexts';
import { useLanguage, useTranslation } from '@/hooks';
import { decodeFromBase64, encodeToBase64 } from '@/services';
import { GraphQlHeadersEditor, GraphQlVariablesEditor, HeadersAndVariablesEditorRowDataItem } from '@/types';
import { Box, Typography } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
}

export default function CustomTabPanel({ children, value, index, content, ...other }: TabPanelProps) {
  const searchParams = useSearchParams();
  const { paramData, setParamData } = useGraphQl();
  const pathname = usePathname();
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const params = Array.from(searchParams.entries());
  const initializedRowsData = params.map(([key, value], index) => ({
    id: index,
    key: decodeFromBase64(key),
    value: decodeFromBase64(value),
    check: true,
  }));

  const [headerData, setHeaderData] = useState<HeadersAndVariablesEditorRowDataItem[]>(initializedRowsData);

  const headerEditors = Object.values(GraphQlHeadersEditor) as string[];
  const variablesEditors = Object.values(GraphQlVariablesEditor) as string[];
  const editors = headerEditors.concat(variablesEditors);

  useEffect(() => {
    const params = new URLSearchParams();
    headerData.forEach(({ key, value, check }) => {
      if (check && (value || key)) {
        const encodedKey = encodeToBase64(key);
        const encodedValue = encodeToBase64(value);
        params.set(encodedKey, encodedValue);
      } else {
        params.delete(key);
      }
      const newPath = `${pathname}?${params}`;
      window.history.replaceState(null, '', newPath);
    });
  }, [headerData, pathname]);

  return (
    <Box
      width="100%"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {editors.includes(content) ?
        <EditorTable
          heading={content}
          currentEditorData={variablesEditors.includes(content) ? paramData : headerData}
          setCurrentEditorData={variablesEditors.includes(content) ? setParamData : setHeaderData}
        />
      : <Typography>{t('graphQl_menu_tab_empty_message')}</Typography>}
    </Box>
  );
}
