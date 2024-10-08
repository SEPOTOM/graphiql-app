'use client';

import { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { Box } from '@mui/material';
import { RequestBodyEditor } from '@/components';
import RequestBodyToggle from './BodyModeToggle/RequestBodyToggle';
import { BodyMode, BodyType, SegmentIndex } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage, useTranslation } from '@/hooks';
import RequestBodyTypeSelector from './BodyTypeSelector/RequestBodyTypeSelector';
import { decodeFromBase64 } from '@/services';

export default function RequestBody() {
  const [bodyMode, setBodyMode] = useState<string>(BodyMode.None);
  const [bodyType, setBodyType] = useState<string>(BodyType.json);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split('/');
  const bodySegment = pathSegments.at(SegmentIndex.Body);
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [decodedBody, setDecodedBody] = useState('');

  const handleBodyTypeChange = (e: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => {
    if (newBodyType !== null) {
      setBodyMode(newBodyType);
    }
  };

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBodyType(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (bodySegment) {
      const decodedValue = decodeFromBase64(bodySegment);
      setBodyMode(BodyMode.Raw);
      setDecodedBody(decodedValue);
      try {
        JSON.parse(decodedValue);
      } catch (e) {
        setBodyType(BodyType.text);
      }
    }
  }, [bodySegment]);

  useEffect(() => {
    const segmentsCount = pathSegments.length;
    const params = new URLSearchParams(searchParams.toString());
    if (bodyMode === BodyMode.None && segmentsCount >= SegmentIndex.LastElement) {
      const newSegments = `${pathSegments.slice(0, SegmentIndex.Body).join('/')}?${params}`;
      window.history.replaceState(null, '', newSegments);
    }
  }, [bodyMode, pathSegments, searchParams]);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <RequestBodyToggle bodyType={bodyMode} handleChange={handleBodyTypeChange} />
        {bodyMode === BodyMode.Raw && <RequestBodyTypeSelector bodytype={bodyType} handleChange={handleModeChange} />}
      </Box>
      {bodyMode === BodyMode.None ?
        <p>{t('body_mode_none_text')}</p>
      : <RequestBodyEditor mode={bodyType} options={{ readOnly: false }} initialValue={decodedBody} />}
    </Box>
  );
}
