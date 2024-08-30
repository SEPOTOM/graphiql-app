import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export interface RequestBodyToggleProps {
  bodyType: string;
  handleChange: (event: React.MouseEvent<HTMLElement>, newBodyType: string | null) => void;
}

export default function RequestBodyToggle({ bodyType, handleChange }: RequestBodyToggleProps) {
  return (
    <ToggleButtonGroup value={bodyType} exclusive onChange={handleChange} aria-label="select request body mode">
      <ToggleButton value="none" aria-label="no request body">
        none
      </ToggleButton>
      <ToggleButton value="raw" aria-label="raw request body">
        raw
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
