const mockRequestData = {
  method: 'POST',
  endpoint: '/api/users',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token123',
  },
  body: {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      preferences: {
        language: 'en',
        timezone: 'UTC',
      },
    },
  },
};

export default mockRequestData;
