export const makeGraphQLRequest = async (query: string, url: string, headers: HeadersInit | undefined) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok boom');
    }
    const data = await response.json();
  } catch (error) {
    throw error;
  }
};
