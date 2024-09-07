import { HeadersAndVariablesEditorRowDataItem } from '@/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface GraphQLData {
  endpointUrl: string;
  setEndpointUrl: Dispatch<SetStateAction<string>>;
  endpointSdlUrl: string;
  setEndpointSdlUrl: Dispatch<SetStateAction<string>>;
  queryText: string;
  setQueryText: Dispatch<SetStateAction<string>>;
  paramData: HeadersAndVariablesEditorRowDataItem[];
  setParamData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
  headerData: HeadersAndVariablesEditorRowDataItem[];
  setHeaderData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export interface GraphQLProviderProps {
  children: ReactNode;
}
