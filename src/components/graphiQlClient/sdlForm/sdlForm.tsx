'use client';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function SDLForm() {
  return (
    <Box className="red" display="flex" width="100%">
      <TextField id="sdl-url" label="SDL URL" variant="outlined" placeholder="Enter SDL URL" fullWidth />
    </Box>
  );
}
