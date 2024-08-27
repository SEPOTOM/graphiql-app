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
    console.log(data);
    // return data;
  } catch (error) {
    console.log('Here not schema');
    console.log(error);
  }
};
