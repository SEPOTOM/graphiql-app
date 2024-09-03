'use client';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import EditorRow from './EditorRow';
import styles from './EditorTable.module.scss';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { DataItem } from '@/contexts/GraphQLContext/types';

interface EditorTableProps {
  heading: string;
  data: DataItem[];
  setData: Dispatch<SetStateAction<DataItem[]>>;
}

export default function EditorTable(props: EditorTableProps) {
  const { heading, data, setData } = props;
  const pathname = usePathname();
  const lng = pathname.split('/').splice(1, 1)[0];
  const { t } = useTranslation(lng);
  const [rows, addRows] = useState([0]);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography>{heading}</Typography>
      <Table sx={{ minWidth: '100%', border: '1px solid rgba(224, 224, 224, 1)' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.edit_row__cell}></TableCell>
            <TableCell className={styles.edit_row__cell}>{t('dataEditorKeyHeading')}</TableCell>
            <TableCell className={styles.edit_row__cell}>{t('dataEditorValueHeading')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((_, index) => {
            return <EditorRow key={index} rowId={index} addRows={addRows} data={data} setData={setData} />;
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
