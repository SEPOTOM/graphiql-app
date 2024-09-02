'use client';

import { ChangeEvent, useState, MouseEvent } from 'react';
import { Box } from '@mui/material';
import RequestBodyEditor from './BodyEditor/RequestBodyEditor';
import RequestBodyToggle from './BodyTypeToggle/RequestBodyToggle';
import RequestModeSelector from './BodyModeSelector/RequestModeSelector';
import { BodyMode, BodyType } from '@/types/enum';

export default function RequestBody() {
  const [bodyType, setBodyType] = useState<string>(BodyMode.None);
  const [mode, setMode] = useState<string>(BodyType.json);

  const handleBodyTypeChange = (e: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => {
    if (newBodyType !== null) {
      setBodyType(newBodyType);
    }
  };

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value.toLowerCase());
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <RequestBodyToggle bodyType={bodyType} handleChange={handleBodyTypeChange} />
        {bodyType === 'raw' && <RequestModeSelector mode={mode} handleChange={handleModeChange} />}
      </Box>
      {bodyType === 'none' ?
        <p>This request does not have a body</p>
      : <RequestBodyEditor mode={mode} />}
    </Box>
  );
}
