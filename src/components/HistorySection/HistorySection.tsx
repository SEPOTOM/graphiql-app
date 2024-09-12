'use client';

import { useLanguage, useLocalStorage, useTranslation } from '@/hooks';
import { StorageKey, RequestHistoryItem } from '@/types';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmptyRequestHistory from './EmptyRequestHistory/EmptyRequestHistory';
import { encodeToBase64 } from '@/services';

export default function HistorySection() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [savedRequests] = useLocalStorage<RequestHistoryItem[]>(StorageKey.Requests, []);

  const content =
    savedRequests.length > 0 ?
      <List>
        {savedRequests.map((item) => {
          return (
            <ListItem
              key={item.id}
              component="a"
              href={`${item.client}/${encodeToBase64(item.endpoint)}/${encodeToBase64(item.body)}?${item.headers}`}
            >
              <ListItemIcon>
                <OpenInNewIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={`${item.client} ${item.endpoint}/${item.body}?${item.headers}`}
                secondary={new Date(item.timestamp).toLocaleString()}
              />
            </ListItem>
          );
        })}
      </List>
    : <EmptyRequestHistory />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>{t('request_history_title')}</h2>
      {window !== undefined && content}
    </Box>
  );
}
