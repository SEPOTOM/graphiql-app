import { HeadersAndVariablesEditorRowDataItem } from '@/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface GraphQLData {
  paramData: HeadersAndVariablesEditorRowDataItem[];
  setParamData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
  headerData: HeadersAndVariablesEditorRowDataItem[];
  setHeaderData: Dispatch<SetStateAction<HeadersAndVariablesEditorRowDataItem[]>>;
}

export interface GraphQLProviderProps {
  children: ReactNode;
}
