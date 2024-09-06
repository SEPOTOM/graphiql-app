'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from '../EditorTable.module.scss';
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { HeadersAndVariablesEditorRowDataItem } from '@/types/types';

interface EditorRowProps {
  rowId: number;
  currentEditorData: HeadersAndVariablesEditorRowDataItem[];
  setCurrentEditorData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export default function EditorRow({ rowId, currentEditorData, setCurrentEditorData }: EditorRowProps) {
  const [checkCheckbox, setCheckCheckbox] = useState(false);
  const pathname = usePathname();
  const [lng] = pathname.split('/').splice(1, 1);
  const { t } = useTranslation(lng);

  const handleEditRowCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentId = event.target.name;
    let result = currentEditorData.filter((entry) => entry.id === Number(currentId))[0];

    if (checkCheckbox) {
      setCheckCheckbox(false);
      result = { ...result, id: rowId, check: false };
    } else {
      setCheckCheckbox(true);
      result = { ...result, id: rowId, check: true };
    }
    let index = currentEditorData.findIndex((value) => value.id === Number(currentId));
    if (index === -1) {
      setCurrentEditorData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...currentEditorData], {
        [index]: result,
      });
      setCurrentEditorData(newArray);
    }
  };

  const handleEditRowTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let result = currentEditorData.filter((entry) => entry.id === rowId)[0];
    result = { ...result, id: rowId, [event.target.name]: event.target.value };

    let index = currentEditorData.findIndex((value) => value.id === rowId);

    if (index === -1) {
      setCurrentEditorData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...currentEditorData], {
        [index]: result,
      });
      setCurrentEditorData(newArray);
    }
  };

  return (
    <TableRow>
      <TableCell className={styles.edit_row__cell}>
        <Checkbox
          name={String(rowId)}
          className={styles.edit_row__cell_checkbox}
          checked={checkCheckbox}
          onChange={handleEditRowCheckboxChange}
        />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField
          className={styles.edit_row__cell_textfield}
          placeholder={t('data_editor_key_heading')}
          name="key"
          onChange={handleEditRowTextFieldChange}
        />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField
          className={styles.edit_row__cell_textfield}
          placeholder={t('data_editor_value_heading')}
          name="value"
          onChange={handleEditRowTextFieldChange}
        />
      </TableCell>
    </TableRow>
  );
}
