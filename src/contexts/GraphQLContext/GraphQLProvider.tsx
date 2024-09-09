'use client';

import { useState } from 'react';
import { GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';
import { HeadersAndVariablesEditorRowDataItem } from '@/types';
import { basicHeadersRows, basicVariablesRows } from './consts';
import { useSearchParams } from 'next/navigation';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  let headersRows: HeadersAndVariablesEditorRowDataItem[] = [];

  const searchParamsFromUrl = useSearchParams();
  if (searchParamsFromUrl) {
    const searchParamsFromUrlArr = searchParamsFromUrl
      .toString()
      .replaceAll('%2F', '/')
      .split('&')
      .map((item) => item.split('='));
    const searchParamsFromUrlObj = searchParamsFromUrlArr.map((item, index) => {
      return { id: index, key: item[0], value: item[1], check: true };
    });
    headersRows = [...searchParamsFromUrlObj];
  }
  console.log(headersRows);

  const [endpointUrl, setEndpointUrl] = useState('');
  const [endpointSdlUrl, setEndpointSdlUrl] = useState('');
  const [queryText, setQueryText] = useState('');
  const [paramData, setParamData] = useState<HeadersAndVariablesEditorRowDataItem[]>(basicVariablesRows);
  const [headerData, setHeaderData] = useState<HeadersAndVariablesEditorRowDataItem[]>(
    searchParamsFromUrl ? basicHeadersRows : headersRows
  );
  const [responseText, setResponseText] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseStatusText, setResponseStatusText] = useState('');

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
        responseText,
        setResponseText,
        responseStatus,
        setResponseStatus,
        responseStatusText,
        setResponseStatusText,
      }}
    >
      {children}
    </GraphQlDataContext.Provider>
  );
};

export default GraphQlDataProvider;
