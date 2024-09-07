'use server';

import { Method } from '@/types';

export const makeGraphQLRequest = async (query: string, url: string, headers: HeadersInit) => {
  try {
    const response = await fetch(url, {
      method: Method.Post,
      headers,
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok boom');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
