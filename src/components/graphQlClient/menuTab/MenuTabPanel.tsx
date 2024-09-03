'use client';

import EditorTable from '@/components/EditorTable/EditorTable';
import { GraphQlDataContext } from '@/contexts/GraphQLContext/GraphQLContext';
import { DataItem } from '@/contexts/GraphQLContext/types';
import { GraphQlHeadersEditor, GraphQlVariablesEditor } from '@/types/enum';
import { Box } from '@mui/material';
import { SetStateAction, useContext } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
}

export default function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, content, ...other } = props;

  const { paramData, setParamData, headerData, setHeaderData } = useContext(GraphQlDataContext);
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
      : <p>Here not be editor</p>}
    </Box>
  );
}
