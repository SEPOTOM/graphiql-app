'use client';

import { createContext, useContext } from 'react';

import { GraphQLData } from '@/contexts/GraphQLContext/types';

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
