'use server';

import { Method } from '@/types';

export const makeGraphQLRequest = async (query: string, variables: HeadersInit, url: string, headers: HeadersInit) => {
  try {
    const response = await fetch(url, {
      method: Method.Post,
      headers,
      body: JSON.stringify({ query, variables }),
    });
    const status = response.status;
    const code = response.statusText;
    const requestData: string = await response.json();
    const data = JSON.stringify(requestData);
    return { data, status, code };
  } catch (error) {
    return `${error}`;
  }
};
