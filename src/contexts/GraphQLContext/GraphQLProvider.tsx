'use client';

import { useState } from 'react';
import { GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [endpointSdlUrl, setEndpointSdlUrl] = useState('');
  const [queryText, setQueryText] = useState('');
  const [paramData, setParamData] = useState<HeadersAndVariablesEditorRowDataItem[]>([]);
  const [headerData, setHeaderData] = useState<HeadersAndVariablesEditorRowDataItem[]>([]);

  return (
    <GraphQlDataContext.Provider
      value={{
        endpointUrl,
        setEndpointUrl,
        endpointSdlUrl,
        setEndpointSdlUrl,
        queryText,
        setQueryText,
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
