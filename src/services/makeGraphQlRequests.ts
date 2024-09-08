'use server';

import { Method } from '@/types';

export const makeGraphQLRequest = async (query: string, url: string, headers: HeadersInit) => {
  try {
    const response = await fetch(url, {
      method: Method.Post,
      headers,
      body: JSON.stringify({ query }),
    });
    const status = response.status;
    const code = response.statusText;
    const request = await response.json();
    const data = JSON.stringify(request);
    return { data, status, code };
  } catch (error) {
    return error;
  }
};
