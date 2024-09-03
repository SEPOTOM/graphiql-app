import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface DataItem {
  check?: boolean;
  id?: number;
  key?: string;
  value?: string;
}

export interface GraphQLData {
  paramData: DataItem[];
  setParamData: Dispatch<SetStateAction<DataItem[]>>;
  headerData: DataItem[];
  setHeaderData: Dispatch<SetStateAction<DataItem[]>>;
}

export interface GraphQLProviderProps {
  children: ReactNode;
}
