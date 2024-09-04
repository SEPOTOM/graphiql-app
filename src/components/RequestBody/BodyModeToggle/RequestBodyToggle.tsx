'use client';

import { useTranslation } from '@/hooks';
import { BodyMode, SegmentIndex } from '@/types';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import { MouseEvent } from 'react';

export interface RequestBodyToggleProps {
  bodyType: string;
  handleChange: (event: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => void;
}

export default function RequestBodyToggle({ bodyType, handleChange }: RequestBodyToggleProps) {
  const pathname = usePathname();
  const lng = pathname.split('/').at(SegmentIndex.Languague) || 'en';
  const { t } = useTranslation(lng);

  const toggleButtonData = [
    { value: BodyMode.None, label: 'no request body', text: t('BodyModeNone') },
    { value: BodyMode.Raw, label: 'raw request body', text: t('BodyModeRaw') },
  ];

  return (
    <ToggleButtonGroup value={bodyType} exclusive onChange={handleChange} aria-label="select request body mode">
      {toggleButtonData.map((button) => (
        <ToggleButton key={button.value} value={button.value} aria-label={button.label}>
          {button.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
