'use client';

import { useState } from 'react';
import { GraphQLProviderProps } from './types';
import { GraphQlDataContext } from './GraphQLContext';

const GraphQlDataProvider = ({ children }: GraphQLProviderProps) => {
  const [paramData, setParamData] = useState([{}]);
  const [headerData, setHeaderData] = useState([{}]);

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
