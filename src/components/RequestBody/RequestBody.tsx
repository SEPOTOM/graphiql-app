'use client';

import { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { Box } from '@mui/material';
import RequestBodyEditor from './BodyEditor/RequestBodyEditor';
import RequestBodyToggle from './BodyModeToggle/RequestBodyToggle';
import { BodyMode, BodyType, SegmentIndex } from '@/types';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import RequestBodyTypeSelector from './BodyTypeSelector/RequestBodyTypeSelector';

export default function RequestBody() {
  const [bodyMode, setBodyMode] = useState<string>(BodyMode.None);
  const [bodyType, setBodyType] = useState<string>(BodyType.json);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments[SegmentIndex.Languague];
  const { t } = useTranslation(lng);

  const handleBodyTypeChange = (e: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => {
    if (newBodyType !== null) {
      setBodyMode(newBodyType);
    }
  };

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBodyType(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const segmentsCount = pathSegments.length;
    if (bodyMode === BodyMode.None && segmentsCount >= SegmentIndex.LastElement) {
      const newSegments = pathSegments.slice(0, SegmentIndex.Body);
      window.history.replaceState(null, '', newSegments.join('/'));
    }
  }, [bodyMode]);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <RequestBodyToggle bodyType={bodyMode} handleChange={handleBodyTypeChange} />
        {bodyMode === 'raw' && <RequestBodyTypeSelector bodytype={bodyType} handleChange={handleModeChange} />}
      </Box>
      {bodyMode === 'none' ?
        <p>{t('BodyModeNoneText')}</p>
      : <RequestBodyEditor mode={bodyType} />}
    </Box>
  );
}
