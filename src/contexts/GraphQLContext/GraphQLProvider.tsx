'use client';

import { useState } from 'react';
import { GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';
import { HeadersAndVariablesEditorRowDataItem } from '@/types/types';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  const [paramData, setParamData] = useState<HeadersAndVariablesEditorRowDataItem[]>([]);
  const [headerData, setHeaderData] = useState<HeadersAndVariablesEditorRowDataItem[]>([]);

  return (
    <GraphQlDataContext.Provider
      value={{
        paramData,
        setParamData,
        headerData,
        setHeaderData,
      }}
    >
      {children}
    </GraphQlDataContext.Provider>
  );
};

export default GraphQlDataProvider;
