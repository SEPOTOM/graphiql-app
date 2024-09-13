'use client';

import { useState } from 'react';
import { GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';
import { basicVariablesRows } from './consts';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [endpointSdlUrl, setEndpointSdlUrl] = useState('');
  const [queryText, setQueryText] = useState('');
  const [paramData, setParamData] = useState<HeadersAndVariablesEditorRowDataItem[]>(basicVariablesRows);
  const [responseText, setResponseText] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseStatusText, setResponseStatusText] = useState('');
  const [schemaGraphQL, setSchemaGraphQL] = useState('Schema not found');

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
        responseText,
        setResponseText,
        responseStatus,
        setResponseStatus,
        responseStatusText,
        setResponseStatusText,
        schemaGraphQL,
        setSchemaGraphQL,
      }}
    >
      {children}
    </GraphQlDataContext.Provider>
  );
};

export default GraphQlDataProvider;
