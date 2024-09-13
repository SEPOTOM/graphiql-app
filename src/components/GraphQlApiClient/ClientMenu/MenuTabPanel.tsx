'use client';

import { EditorTable, SchemaGraphQL } from '@/components';
import { useGraphQl } from '@/contexts';
import { basicHeadersRows } from '@/contexts/GraphQLContext/consts';
import { GraphQlHeadersEditor, GraphQlVariablesEditor, HeadersAndVariablesEditorRowDataItem } from '@/types';
import { Box } from '@mui/material';
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
  const params = Array.from(searchParams.entries());
  const initializedRowsData =
    params.length > 0 ?
      params.map(([key, value], index) => ({
        id: index,
        key: decodeURIComponent(key),
        value: decodeURIComponent(value),
        check: true,
      }))
    : basicHeadersRows;

  const [headerData, setHeaderData] = useState<HeadersAndVariablesEditorRowDataItem[]>(initializedRowsData);

  const headerEditors = Object.values(GraphQlHeadersEditor) as string[];
  const variablesEditors = Object.values(GraphQlVariablesEditor) as string[];
  const editors = headerEditors.concat(variablesEditors);

  useEffect(() => {
    const params = new URLSearchParams();
    headerData.forEach(({ key, value, check }) => {
      if (check && (value || key)) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
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
      : <SchemaGraphQL />}
    </Box>
  );
}
