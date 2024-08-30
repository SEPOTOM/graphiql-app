'use client';

import { ChangeEvent, useState } from 'react';
import RequestBodyToggle from './RequestBodyToggle';
import RequestModeSelector from './RequestModeSelector ';
import { Box } from '@mui/material';
import RequestBodyEditor from './RequestBodyEditor';

export default function RequestBody() {
  const [bodyType, setBodyType] = useState('none');
  const [mode, setMode] = useState('json');

  const handleBodyTypeChange = (e: React.MouseEvent<HTMLElement>, newBodyType: string | null) => {
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
