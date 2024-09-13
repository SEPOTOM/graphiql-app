export interface RequestHistoryItem {
  id: string;
  client: string;
  endpoint: string;
  body: string;
  headers: string;
  timestamp: number;
}
