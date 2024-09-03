'use client';

import { useState } from 'react';
import { DataItem, GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  const [paramData, setParamData] = useState([] as DataItem[]);
  const [headerData, setHeaderData] = useState([] as DataItem[]);

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
