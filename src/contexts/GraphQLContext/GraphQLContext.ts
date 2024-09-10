'use client';

import { createContext, useContext } from 'react';

import { GraphQLData } from './types';

const GraphQlDataContext = createContext<GraphQLData>({
  endpointUrl: '',
  setEndpointUrl: () => {},
  endpointSdlUrl: '',
  setEndpointSdlUrl: () => {},
  queryText: '',
  setQueryText: () => {},
  paramData: [],
  setParamData: () => {},
  headerData: [],
  setHeaderData: () => {},
  responseText: '',
  setResponseText: () => {},
  responseStatus: 0,
  setResponseStatus: () => {},
  responseStatusText: '',
  setResponseStatusText: () => {},
  schemaGraphQL: '',
  setSchemaGraphQL: () => {},
});

const useGraphQl = () => {
  return useContext(GraphQlDataContext);
};

export { GraphQlDataContext, useGraphQl };
