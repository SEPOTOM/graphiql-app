'use client';

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import EditorRow from './EditorRow/EditorRow';
import styles from './EditorTable.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { useEffect, useState } from 'react';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';

interface EditorTableProps {
  heading: string;
}

export default function EditorTable({ heading }: EditorTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);
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
    });
  }, [rowsData]);

  const [rows, addRows] = useState(rowsData.length ? Array.from(Array(rowsData.length).keys()) : [0]);

  const handleClick = () => {
    addRows((oldArr) => [...oldArr, rows.length]);
  };

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
              <EditorRow key={index} rowId={index} currentEditorData={rowsData} setCurrentEditorData={setRowsData} />
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
