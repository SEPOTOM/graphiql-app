import { BodyMode } from '@/types/enum';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { MouseEvent } from 'react';

export interface RequestBodyToggleProps {
  bodyType: string;
  handleChange: (event: MouseEvent<HTMLElement>, newBodyType: Nullable<string>) => void;
}

export default function RequestBodyToggle({ bodyType, handleChange }: RequestBodyToggleProps) {
  const toggleButtonData = [
    { value: BodyMode.None, label: 'no request body', text: BodyMode.None },
    { value: BodyMode.Raw, label: 'raw request body', text: BodyMode.Raw },
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
