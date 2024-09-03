'use server';

export const makeGraphQLRequest = async (query: string, url: string, headers: HeadersInit) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok boom');
    }
    const data = await response.json();
  } catch {
    const resultStr = 'Your query is mot wrong';
    return JSON.stringify(resultStr);
  }
};
