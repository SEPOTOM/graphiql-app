'use client';

import { useLanguage, useTranslation } from '@/hooks';
import { BodyMode } from '@/types';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { MouseEvent } from 'react';

export interface RequestBodyToggleProps {
  bodyType: string;
  handleChange: (event: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => void;
}

export default function RequestBodyToggle({ bodyType, handleChange }: RequestBodyToggleProps) {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);

  const toggleButtonData = [
    { value: BodyMode.None, label: 'no request body', text: t('body_mode_none') },
    { value: BodyMode.Raw, label: 'raw request body', text: t('body_mode_raw') },
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
