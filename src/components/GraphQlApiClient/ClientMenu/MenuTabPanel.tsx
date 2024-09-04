'use client';

import EditorTable from '@/components/EditorTable/EditorTable';
import { GraphQlDataContext } from '@/contexts/GraphQLContext/GraphQLContext';
import { useTranslation } from '@/hooks';
import { GraphQlHeadersEditor, GraphQlVariablesEditor } from '@/types/enum';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
}

export default function CustomTabPanel({ children, value, index, content, ...other }: TabPanelProps) {
  const { paramData, setParamData, headerData, setHeaderData } = useContext(GraphQlDataContext);
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  const headerEditors = Object.values(GraphQlHeadersEditor) as string[];
  const variablesEditors = Object.values(GraphQlVariablesEditor) as string[];
  const editors = headerEditors.concat(variablesEditors);

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
          data={variablesEditors.includes(content) ? paramData : headerData}
          setData={variablesEditors.includes(content) ? setParamData : setHeaderData}
        />
      : <Typography>{t('graphQl_menu_tab_empty_message')}</Typography>}
    </Box>
  );
}
