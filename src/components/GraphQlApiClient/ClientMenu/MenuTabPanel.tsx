'use client';

import { EditorTable } from '@/components';
import { useGraphQl } from '@/contexts';
import { useTranslation } from '@/hooks';
import { GraphQlHeadersEditor, GraphQlVariablesEditor } from '@/types';
import { Box, Typography } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
}

export default function CustomTabPanel({ children, value, index, content, ...other }: TabPanelProps) {
  const { paramData, setParamData, headerData, setHeaderData } = useGraphQl();
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);
  const headerEditors = Object.values(GraphQlHeadersEditor) as string[];
  const variablesEditors = Object.values(GraphQlVariablesEditor) as string[];
  const editors = headerEditors.concat(variablesEditors);
  // const searchParamsFromUrl = useSearchParams();

  // useEffect(() => {
  //   if (searchParamsFromUrl && searchParamsFromUrl.size > 1) {
  //     const searchParamsFromUrlArr = searchParamsFromUrl
  //       .toString()
  //       .replaceAll('%2F', '/')
  //       .split('&')
  //       .map((item) => item.split('='));
  //     const searchParamsFromUrlObj = searchParamsFromUrlArr.map((item, index) => {
  //       return { id: index, key: item[0], value: item[1], check: true };
  //     });
  //     setHeaderData([...searchParamsFromUrlObj]);
  //   }
  // }, [searchParamsFromUrl, setHeaderData]);

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
