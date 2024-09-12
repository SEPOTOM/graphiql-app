import { Mock } from 'vitest';
import { render } from '@testing-library/react';

import { LanguageProvider, useAuth } from '@/contexts';
import { PublicRoute } from '@/components';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PublicRoute', () => {
  it('shows a loading message during authentication', () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'init' }));

    const { getByRole } = render(
      <LanguageProvider lang="en">
        <PublicRoute>Test message</PublicRoute>
      </LanguageProvider>
    );

    expect(getByRole('paragraph')).toHaveTextContent(/loading/i);
  });

  it('shows a message during redirect if the user in authenticated', () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'authenticated' }));

    const { getByRole } = render(
      <LanguageProvider lang="en">
        <PublicRoute>Test message</PublicRoute>
      </LanguageProvider>
    );

    expect(getByRole('paragraph')).toHaveTextContent(/redirect/i);
  });

  it("shows the nested content is the user isn't authenticated", () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'unauthenticated' }));

    const { getByText } = render(
      <LanguageProvider lang="en">
        <PublicRoute>Test message</PublicRoute>
      </LanguageProvider>
    );

    expect(getByText('Test message')).toBeInTheDocument();
  });
});
