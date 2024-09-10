'use client';

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import EditorRow from './EditorRow/EditorRow';
import styles from './EditorTable.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GraphQlHeadersEditor, HeadersAndVariablesEditorRowDataItem } from '@/types';
import { getNewPathHeaders } from '@/services';

interface EditorTableProps {
  heading: string;
  currentEditorData: HeadersAndVariablesEditorRowDataItem[];
  setCurrentEditorData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export default function EditorTable({ heading, currentEditorData, setCurrentEditorData }: EditorTableProps) {
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);
  const [rows, addRows] = useState(Array.from(Array(currentEditorData.length).keys()));

  console.log(heading);
  console.log(currentEditorData);

  const handleClick = () => {
    addRows((oldArr) => [...oldArr, rows.length]);
  };

  useEffect(() => {
    if (heading === GraphQlHeadersEditor.HeadersEditorRU || heading === GraphQlHeadersEditor.HeadersEditorEN) {
      const headers: URLSearchParams = Object.fromEntries(
        currentEditorData.filter((item) => item.check === true).map((item) => [item.key, item.value])
      );
      const searchParams = new URLSearchParams(headers as URLSearchParams);
      const newPath = getNewPathHeaders(pathname, searchParams.toString().replaceAll('%2F', '/'));
      window.history.replaceState(null, '', newPath);
    }
  }, [currentEditorData, heading, pathname]);

  return (
    <Box display="flex" gap={1} flexDirection="column" width="100%">
      <Typography>{heading}</Typography>
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
