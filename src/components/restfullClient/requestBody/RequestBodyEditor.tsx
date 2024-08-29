'use client';

import { ChangeEvent, useState } from 'react';
import RequestBodyToggle from './RequestBodyToggle';
import RequestModeSelector from './RequestModeSelector ';
import { Box } from '@mui/material';

export default function RequestBodyEditor() {
  const [bodyType, setBodyType] = useState('none');
  const [mode, setMode] = useState('JSON');

  const handleBodyTypeChange = (e: React.MouseEvent<HTMLElement>, newBodyType: string | null) => {
    if (newBodyType !== null) {
      setBodyType(newBodyType);
    }
  };

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <RequestBodyToggle bodyType={bodyType} handleChange={handleBodyTypeChange} />
      {bodyType === 'raw' && <RequestModeSelector mode={mode} handleChange={handleModeChange} />}
    </Box>
  );
}
