'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../EditorTable.module.scss';
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useLanguage, useTranslation } from '@/hooks';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';

interface EditorRowProps {
  rowId: number;
  currentEditorData: HeadersAndVariablesEditorRowDataItem[];
  setCurrentEditorData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export default function EditorRow({ rowId, currentEditorData, setCurrentEditorData }: EditorRowProps) {
  const [isChecked, setIsChecked] = useState(currentEditorData[rowId]?.check ?? false);
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  useEffect(() => {
    setIsChecked(currentEditorData[rowId]?.check ?? false);
  }, [currentEditorData]);

  const handleEditRowCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentRowId = Number(event.target.name);
    const index = currentEditorData.findIndex((value) => value.id === currentRowId);
    let result: HeadersAndVariablesEditorRowDataItem = { id: rowId, check: !isChecked, key: '', value: '' };

    setIsChecked((prev) => !prev);

    if (index === -1) {
      setCurrentEditorData((oldArr) => [...oldArr, result]);
    } else {
      result = { ...currentEditorData[index], check: !isChecked };
      const newArray = Object.assign([...currentEditorData], {
        [index]: result,
      });
      setCurrentEditorData(newArray);
    }
  };

  const handleEditRowTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let result: HeadersAndVariablesEditorRowDataItem = {
      check: isChecked,
      id: rowId,
      key: '',
      value: '',
      [event.target.name]: event.target.value,
    };

    const index = currentEditorData.findIndex((value) => value.id === rowId);

    if (index === -1) {
      setCurrentEditorData((oldArr) => [...oldArr, result]);
    } else {
      result = { ...currentEditorData[index], [event.target.name]: event.target.value };
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
          checked={isChecked}
          onChange={handleEditRowCheckboxChange}
        />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField
          className={styles.edit_row__cell_textfield}
          placeholder={t('data_editor_key_heading')}
          name="key"
          onChange={handleEditRowTextFieldChange}
          defaultValue={currentEditorData[rowId]?.key ?? ''}
        />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField
          className={styles.edit_row__cell_textfield}
          placeholder={t('data_editor_value_heading')}
          name="value"
          onChange={handleEditRowTextFieldChange}
          defaultValue={currentEditorData[rowId]?.value ?? ''}
        />
      </TableCell>
    </TableRow>
  );
}
