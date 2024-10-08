'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../EditorTable.module.scss';
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material';
import { useLanguage, useTranslation } from '@/hooks';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';

interface EditorRowProps {
  rowId: number;
  currentEditorData: HeadersAndVariablesEditorRowDataItem[];
  setCurrentEditorData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export default function EditorRow({ rowId, currentEditorData, setCurrentEditorData }: EditorRowProps) {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const currentEditorDataRow = currentEditorData[rowId];
  const [isChecked, setIsChecked] = useState(currentEditorDataRow?.check ?? false);
  const defaultRowKey = currentEditorDataRow ? currentEditorDataRow.key : '';
  const defaultRowValue = currentEditorDataRow ? currentEditorDataRow.value : '';

  useEffect(() => {
    setIsChecked(currentEditorDataRow?.check ?? false);
  }, [currentEditorDataRow]);

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
          defaultValue={defaultRowKey}
        />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField
          className={styles.edit_row__cell_textfield}
          placeholder={t('data_editor_value_heading')}
          name="value"
          onChange={handleEditRowTextFieldChange}
          defaultValue={defaultRowValue}
        />
      </TableCell>
    </TableRow>
  );
}
