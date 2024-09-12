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
});
