'use client';

import { Box } from '@mui/material';

interface RequestBodyMenuTabsProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function RequestBodyMenuTabs({ children, value, index, ...other }: RequestBodyMenuTabsProps) {
  return (
    <Box
      sx={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}
