'use client';

import { createContext, useContext } from 'react';

import { GraphQLData } from './types';

const GraphQlDataContext = createContext<GraphQLData>({
  paramData: [],
  setParamData: () => {},
  headerData: [],
  setHeaderData: () => {},
});

const useGraphQl = () => {
  return useContext(GraphQlDataContext);
};

export { GraphQlDataContext, useGraphQl };
