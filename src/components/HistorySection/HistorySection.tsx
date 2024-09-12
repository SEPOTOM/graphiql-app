'use client';

import { useLanguage, useLocalStorage, useTranslation } from '@/hooks';
import { StorageKey } from '@/types';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmptyRequestHistory from './EmptyRequestHistory/EmptyRequestHistory';

interface RequestHistoryItem {
  id: string;
  url: string;
  timestamp: number;
}

export default function HistorySection() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [savedRequests] = useLocalStorage<RequestHistoryItem[]>(StorageKey.Requests, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>{t('request_history_title')}</h2>
      {savedRequests.length > 0 ?
        <List>
          {savedRequests.map((item) => {
            return (
              <ListItem key={item.id} component="a" href={`${item.url}`}>
                <ListItemIcon>
                  <OpenInNewIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.url} secondary={new Date(item.timestamp).toLocaleString()} />
              </ListItem>
            );
          })}
        </List>
      : <EmptyRequestHistory />}
    </Box>
  );
}
