import { Mock } from 'vitest';
import { render } from '@testing-library/react';

import { useAuth, LanguageProvider } from '@/contexts';

import PrivateRoute from './PrivateRoute';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PrivateRoute', () => {
  it('shows a loading message during authentication', async () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'init' }));

    const { findByRole } = render(
      <LanguageProvider lang="en">
        <PrivateRoute>Test message</PrivateRoute>
      </LanguageProvider>
    );

    expect(await findByRole('paragraph')).toHaveTextContent(/authentication in progress/i);
  });

  it("shows a message during redirect if the user ins't authenticated", async () => {
    (useAuth as Mock).mockImplementation(() => ({ user: null }));

    const { findByRole } = render(
      <LanguageProvider lang="en">
        <PrivateRoute>Test message</PrivateRoute>
      </LanguageProvider>
    );

    expect(await findByRole('paragraph')).toHaveTextContent(/redirect/i);
  });

  it('shows the nested content is the user is authenticated', async () => {
    (useAuth as Mock).mockImplementation(() => ({ user: {} }));

    const { findByText } = render(
      <LanguageProvider lang="en">
        <PrivateRoute>Test message</PrivateRoute>
      </LanguageProvider>
    );

    expect(await findByText('Test message')).toBeInTheDocument();
  });
});
