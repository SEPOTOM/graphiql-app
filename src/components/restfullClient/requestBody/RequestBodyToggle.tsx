// import { Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import { ChangeEvent } from 'react';

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export interface RequestBodyToggleProps {
  bodyType: string;
  handleChange: (event: React.MouseEvent<HTMLElement>, newBodyType: string | null) => void;
}

// export default function RequestBodyToggle({ handleChange }: RequestBodyToggleProps) {
//   return (
//     <Box p={4}>
//       <RadioGroup
//         row
//         aria-labelledby="demo-controlled-radio-buttons-group"
//         name="controlled-radio-buttons-group"
//         defaultValue="none"
//         onChange={handleChange}
//       >
//         <FormControlLabel value="none" control={<Radio />} label="none" />
//         <FormControlLabel value="row" control={<Radio />} label="row" />
//       </RadioGroup>
//     </Box>
//   );
// }

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
