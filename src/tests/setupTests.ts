import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

import { server } from '@/tests/mocks/server';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
