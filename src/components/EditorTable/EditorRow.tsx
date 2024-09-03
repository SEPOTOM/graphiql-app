'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './EditorTable.module.scss';
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material';
import { DataItem } from '@/contexts/GraphQLContext/types';

interface EditorRowProps {
  addRows: Dispatch<SetStateAction<number[]>>;
  rowId: number;
  data: DataItem[];
  setData: Dispatch<SetStateAction<DataItem[]>>;
}

export default function EditorRow(props: EditorRowProps) {
  const { addRows, rowId, data, setData } = props;
  const [checkCheckbox, setCheckCheckbox] = useState(false);

  const handleEditRowCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let result = data.filter((entry) => entry.id === Number(event.target.name))[0];

    if (checkCheckbox) {
      setCheckCheckbox(false);
      result = { ...result, id: rowId, check: false };
    } else {
      setCheckCheckbox(true);
      addRows((oldArr) => [...oldArr, rowId]);
      result = { ...result, id: rowId, check: true };
    }
    let index = data.findIndex((value) => value.id === Number(event.target.name));
    if (index === -1) {
      setData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setData(newArray);
    }
  };

  const handleEditRowTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let result = data.filter((entry) => entry.id === rowId)[0];
    result = { ...result, id: rowId, [event.target.name]: event.target.value };

    let index = data.findIndex((value) => value.id === rowId);

    if (index === -1) {
      setData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setData(newArray);
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
        <TextField className={styles.edit_row__cell_textfield} name="key" onChange={handleEditRowTextFieldChange} />
      </TableCell>
      <TableCell className={styles.edit_row__cell}>
        <TextField className={styles.edit_row__cell_textfield} name="value" onChange={handleEditRowTextFieldChange} />
      </TableCell>
    </TableRow>
  );
}
