import { RequestHistoryItem } from '@/types';

const savedRequests: RequestHistoryItem[] = [
  {
    id: '1',
    client: 'restfullClient/GET',
    endpoint: 'http://api/data',
    body: '{}',
    headers: 'header1=value1',
    timestamp: Date.now(),
  },
  {
    id: '2',
    client: 'restfullClient/POST',
    endpoint: 'http://api/submit',
    body: '{"key":"value"}',
    headers: 'header2=value2',
    timestamp: Date.now() - 1000,
  },
];

export default savedRequests;
