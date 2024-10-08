'use client';

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import EditorRow from './EditorRow/EditorRow';
import styles from './EditorTable.module.scss';
import { useLanguage, useTranslation } from '@/hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';
import { initializeRows } from '@/services';

interface EditorTableProps {
  heading: string;
  currentEditorData: HeadersAndVariablesEditorRowDataItem[];
  setCurrentEditorData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export default function EditorTable({ heading, currentEditorData, setCurrentEditorData }: EditorTableProps) {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [rows, addRows] = useState(initializeRows(currentEditorData.length));

  useEffect(() => {
    addRows(initializeRows(currentEditorData.length));
  }, [currentEditorData]);

  const handleClick = () => {
    addRows((oldArr) => [...oldArr, rows.length]);
  };

  return (
    <Box display="flex" gap={1} flexDirection="column" width="100%" paddingLeft={2}>
      <Typography variant="h6">{heading}</Typography>
      <Table sx={{ minWidth: '100%', border: '1px solid rgba(224, 224, 224, 1)' }}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.edit_row__cell}>
              <Button variant="outlined" onClick={handleClick} fullWidth>
                +
              </Button>
            </TableCell>
            <TableCell className={styles.edit_row__cell}>{t('data_editor_key_heading')}</TableCell>
            <TableCell className={styles.edit_row__cell}>{t('data_editor_value_heading')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((_, index) => {
            return (
              <EditorRow
                key={index}
                rowId={index}
                currentEditorData={currentEditorData}
                setCurrentEditorData={setCurrentEditorData}
              />
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
