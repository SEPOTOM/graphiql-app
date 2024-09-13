import { Mock } from 'vitest';
import { render } from '@testing-library/react';

import { LanguageProvider, useAuth } from '@/contexts';

import AuthBanner from './AuthBanner';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('AuthBanner', () => {
  it('displays the sign in and sing up links for unauthenticated users', () => {
    (useAuth as Mock).mockImplementation(() => ({ user: null }));

    const { getByRole } = render(
      <LanguageProvider lang="en">
        <AuthBanner />
      </LanguageProvider>
    );

    expect(getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });
});
